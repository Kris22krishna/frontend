/**
 * useSessionLogger — v4 session lifecycle hook
 *
 * Implements the full PRD session lifecycle:
 *   startSession  → generates sessionId, records startedAt
 *   logAnswer     → upserts a row in v4_session_temp
 *   finishSession → compiles into v4_sessions + upserts v4_skill_progress
 *
 * All writes go directly to Supabase (anon key, same as v3_* tables).
 * user_id is read from sessionStorage under the key 'userId'.
 */
import { useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export function useSessionLogger() {
  const sessionRef = useRef(null); // { sessionId, nodeId, sessionType, userId, startedAt }
  const logginRef  = useRef(false);

  /** ── startSession ─────────────────────────────────────────────────────── */
  const startSession = useCallback(({ nodeId, sessionType }) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.warn('[useSessionLogger] No userId in sessionStorage — session not started');
      return null;
    }
    const sessionId = generateUUID();
    sessionRef.current = {
      sessionId,
      nodeId,
      sessionType,
      userId,
      startedAt: new Date().toISOString(),
    };
    console.log('[useSessionLogger] Session started', sessionRef.current);
    return sessionId;
  }, []);

  /** ── logAnswer ────────────────────────────────────────────────────────── */
  const logAnswer = useCallback(async (params) => {
    const {
      questionIndex,
      question_index,
      answerJson,
      answer_json,
      isCorrect,
      is_correct,
      marksAwarded,
      marks_awarded,
      marksPossible,
      marks_possible,
      timeTakenMs,
      time_taken_ms,
    } = params;

    const s = sessionRef.current;
    if (!s) return;

    const qIdx = questionIndex ?? question_index;
    const isCorr = isCorrect ?? is_correct ?? 0;
    const aJson = answerJson ?? answer_json ?? {};

    const payload = {
      session_id:     s.sessionId,
      user_id:        s.userId,
      node_id:        s.nodeId,
      session_type:   s.sessionType,
      question_index: qIdx,
      answer_json:    aJson,
      is_correct:     isCorr,
      marks_awarded:  marksAwarded ?? marks_awarded ?? isCorr,
      marks_possible: marksPossible ?? marks_possible ?? 1,
      time_taken_ms:  timeTakenMs ?? time_taken_ms,
      answered_at:    new Date().toISOString(),
    };

    const { error } = await supabase
      .from('v4_session_temp')
      .upsert(payload, {
        onConflict: 'session_id,question_index',
        ignoreDuplicates: false,
      });

    if (!error) {
      await supabase.rpc('v4_increment_revision_count', {
        p_session_id:     s.sessionId,
        p_question_index: qIdx,
      }).then(() => {}).catch(() => {});
    }

    if (error) {
      console.error('[useSessionLogger] logAnswer error', error);
    }
  }, []);

  /** ── finishSession ────────────────────────────────────────────────────── */
  const finishSession = useCallback(async (params = {}) => {
    const {
      totalQuestions,
      total_questions,
      questionsAnswered,
      questions_answered,
      answersPayload,
      answers_payload,
      totalScore,        // optional fallback
      retainTempRows = false,
      status = 'completed',
    } = params;

    const tQty = totalQuestions ?? total_questions ?? 0;
    const qAns = questionsAnswered ?? questions_answered;
    const aPayload = answersPayload ?? answers_payload;

    const s = sessionRef.current;
    if (!s || logginRef.current) return null;
    logginRef.current = true;

    try {
      let finalAnswers = aPayload || [];

      // Fallback: fetch from temp if payload missing
      if (finalAnswers.length === 0) {
        const { data: tempRows } = await supabase
          .from('v4_session_temp')
          .select('*')
          .eq('session_id', s.sessionId)
          .order('question_index', { ascending: true });
        
        if (tempRows && tempRows.length > 0) {
          finalAnswers = tempRows.map(r => ({
            question_index: r.question_index,
            answer_json: r.answer_json,
            is_correct: r.is_correct,
            marks_awarded: r.marks_awarded,
            marks_possible: r.marks_possible,
            time_taken_ms: r.time_taken_ms
          }));
        }
      }

      // Final guard: if still empty, use totalScore if provided to make a dummy entry
      if (finalAnswers.length === 0 && totalScore !== undefined) {
        finalAnswers = [{
          question_index: 0,
          answer_json: { summary: true },
          is_correct: 1.0, 
          marks_awarded: totalScore,
          marks_possible: tQty || totalScore,
          time_taken_ms: 0
        }];
      }

      if (finalAnswers.length === 0) {
        console.log('[useSessionLogger] Zero-answer session discarded');
        sessionRef.current = null;
        logginRef.current = false;
        return null;
      }

      const endedAt = new Date().toISOString();

      // Calculate totals
      const totalMarksAwarded  = finalAnswers.reduce((s, a) => s + (a.marks_awarded  ?? 0), 0);
      const totalMarksPossible = finalAnswers.reduce((s, a) => s + (a.marks_possible ?? 1), 0);
      const accuracyPct = totalMarksPossible > 0
        ? Math.floor((totalMarksAwarded / totalMarksPossible) * 100)
        : 0;

      const startedMs = new Date(s.startedAt).getTime();
      const endedMs   = new Date(endedAt).getTime();
      const timeTakenSeconds = Math.round((endedMs - startedMs) / 1000);

      // Build answers_json array sorted by question_index
      const answersJson = [...finalAnswers].sort((a, b) => a.question_index - b.question_index);

      // ── Insert into v4_sessions ──────────────────────────────────────────
      const sessionRow = {
        id:                   s.sessionId,
        user_id:              s.userId,
        node_id:              s.nodeId,
        session_type:         s.sessionType,
        status,
        total_questions:      tQty || finalAnswers.length,
        questions_answered:   qAns ?? finalAnswers.length,
        total_marks_awarded:  totalMarksAwarded,
        total_marks_possible: totalMarksPossible,
        accuracy_pct:         accuracyPct,
        time_taken_seconds:   timeTakenSeconds,
        started_at:           s.startedAt,
        ended_at:             endedAt,
        answers_json:         answersJson,
      };

      const { error: sessionError } = await supabase
        .from('v4_sessions')
        .insert(sessionRow);

      if (sessionError) {
        console.error('[useSessionLogger] finishSession insert error', sessionError);
      }

      // ── Upsert v4_skill_progress ─────────────────────────────────────────
      // Fetch current progress to compare best_accuracy_pct
      const { data: existing } = await supabase
        .from('v4_skill_progress')
        .select('best_accuracy_pct, total_attempts')
        .eq('user_id', s.userId)
        .eq('node_id', s.nodeId)
        .maybeSingle();

      const bestAccuracyPct = Math.max(accuracyPct, existing?.best_accuracy_pct ?? 0);
      const totalAttempts   = (existing?.total_attempts ?? 0) + 1;

      const { error: progressError } = await supabase
        .from('v4_skill_progress')
        .upsert({
          user_id:             s.userId,
          node_id:             s.nodeId,
          latest_accuracy_pct: accuracyPct,
          best_accuracy_pct:   bestAccuracyPct,
          latest_session_id:   s.sessionId,
          best_session_id:     accuracyPct >= (existing?.best_accuracy_pct ?? 0)
                                 ? s.sessionId
                                 : existing?.best_session_id ?? s.sessionId,
          total_attempts:      totalAttempts,
          last_attempted_at:   endedAt,
          updated_at:          endedAt,
        }, { onConflict: 'user_id,node_id' });

      if (progressError) {
        console.error('[useSessionLogger] progress upsert error', progressError);
      }

      // ── Cleanup temp rows ────────────────────────────────────────────────
      if (retainTempRows) {
        await supabase
          .from('v4_session_temp')
          .update({ compiled_at: endedAt })
          .eq('session_id', s.sessionId);
      } else {
        await supabase
          .from('v4_session_temp')
          .delete()
          .eq('session_id', s.sessionId);
      }

      console.log('[useSessionLogger] Session compiled', {
        sessionId: s.sessionId,
        accuracy: accuracyPct,
        totalAttempts,
      });

      sessionRef.current = null;
      logginRef.current  = false;
      return { sessionId: s.sessionId, accuracyPct, totalAttempts };

    } catch (err) {
      console.error('[useSessionLogger] Unexpected error', err);
      logginRef.current = false;
      return null;
    }
  }, []);

  /** ── abandonSession ───────────────────────────────────────────────────── */
  const abandonSession = useCallback(async ({ answersPayload = [], totalQuestions = 0 } = {}) => {
    return finishSession({
      totalQuestions,
      questionsAnswered: answersPayload.length,
      answersPayload,
      status: 'abandoned',
    });
  }, [finishSession]);

  return { startSession, logAnswer, finishSession, abandonSession };
}
