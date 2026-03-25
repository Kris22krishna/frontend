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
  const logAnswer = useCallback(async ({
    questionIndex, // 1-based
    answerJson,    // { selected: idx } | { value: n } | etc.
    isCorrect,     // 1.0 | 0.5 | 0.0
    marksAwarded = null,
    marksPossible = null,
    timeTakenMs = null,
  }) => {
    const s = sessionRef.current;
    if (!s) return;

    const payload = {
      session_id:     s.sessionId,
      user_id:        s.userId,
      node_id:        s.nodeId,
      session_type:   s.sessionType,
      question_index: questionIndex,
      answer_json:    answerJson,
      is_correct:     isCorrect,
      marks_awarded:  marksAwarded  ?? isCorrect,         // default 1pt per Q
      marks_possible: marksPossible ?? 1,
      time_taken_ms:  timeTakenMs,
      answered_at:    new Date().toISOString(),
    };

    const { error } = await supabase
      .from('v4_session_temp')
      .upsert(payload, {
        onConflict: 'session_id,question_index',
        // On revision: overwrite answer_json, is_correct, marks, time, answered_at
        // and increment revision_count via DB expression (handled below)
        ignoreDuplicates: false,
      });

    // Increment revision_count in a separate step if row already existed
    if (!error) {
      await supabase.rpc('v4_increment_revision_count', {
        p_session_id:     s.sessionId,
        p_question_index: questionIndex,
      }).then(() => {}).catch(() => {}); // rpc optional — ignore if not created
    }

    if (error) {
      console.error('[useSessionLogger] logAnswer error', error);
    }
  }, []);

  /** ── finishSession ────────────────────────────────────────────────────── */
  const finishSession = useCallback(async ({
    totalQuestions,
    questionsAnswered,
    answersPayload,    // array of { question_index, answer_json, is_correct, marks_awarded, marks_possible, time_taken_ms }
    retainTempRows = false,
    status = 'completed',
  }) => {
    const s = sessionRef.current;
    if (!s || logginRef.current) return null;
    logginRef.current = true;

    try {
      // Guard: zero-answer sessions are discarded silently
      if (!answersPayload || answersPayload.length === 0) {
        console.log('[useSessionLogger] Zero-answer session discarded');
        sessionRef.current = null;
        logginRef.current = false;
        return null;
      }

      const endedAt = new Date().toISOString();

      // Calculate totals
      const totalMarksAwarded  = answersPayload.reduce((s, a) => s + (a.marks_awarded  ?? 0), 0);
      const totalMarksPossible = answersPayload.reduce((s, a) => s + (a.marks_possible ?? 1), 0);
      const accuracyPct = totalMarksPossible > 0
        ? Math.floor((totalMarksAwarded / totalMarksPossible) * 100)
        : 0;

      const startedMs = new Date(s.startedAt).getTime();
      const endedMs   = new Date(endedAt).getTime();
      const timeTakenSeconds = Math.round((endedMs - startedMs) / 1000);

      // Build answers_json array sorted by question_index
      const answersJson = [...answersPayload].sort((a, b) => a.question_index - b.question_index);

      // ── Insert into v4_sessions ──────────────────────────────────────────
      const sessionRow = {
        id:                   s.sessionId,
        user_id:              s.userId,
        node_id:              s.nodeId,
        session_type:         s.sessionType,
        status,
        total_questions:      totalQuestions,
        questions_answered:   questionsAnswered,
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
