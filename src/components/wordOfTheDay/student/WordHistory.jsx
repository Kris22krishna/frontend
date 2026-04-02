import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { wordApi } from '../services/wordApi';
import './WordHistory.css';

/* ── Dummy data (7 words) ── */
const DUMMY_HISTORY = [
  {
    id: 1,
    word: 'Serendipity',
    meaning: 'Finding something good without looking for it.',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&q=80',
    date: '2026-03-31',
  },
  {
    id: 2,
    word: 'Ephemeral',
    meaning: 'Lasting for a very short time, like a beautiful sunset.',
    image:
      'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=200&q=80',
    date: '2026-03-30',
  },
  {
    id: 3,
    word: 'Luminous',
    meaning: 'Giving off light; bright or shining, especially in the dark.',
    image:
      'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=200&q=80',
    date: '2026-03-29',
  },
  {
    id: 4,
    word: 'Whimsical',
    meaning: 'Playfully quaint or fanciful, especially in an appealing way.',
    image:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&q=80',
    date: '2026-03-28',
  },
  {
    id: 5,
    word: 'Resilience',
    meaning:
      'The ability to recover quickly from difficulties; toughness.',
    image:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=200&q=80',
    date: '2026-03-27',
  },
  {
    id: 6,
    word: 'Cascade',
    meaning: 'A small waterfall or a series of things that fall one after another.',
    image:
      'https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=200&q=80',
    date: '2026-03-26',
  },
  {
    id: 7,
    word: 'Harmony',
    meaning:
      'A pleasing arrangement of parts; agreement or peace.',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=80',
    date: '2026-03-25',
  },
];

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const WordHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await wordApi.getRecentWords();
        setHistoryData(data || []);
      } catch (err) {
        console.error('Failed to load word history:', err);
        setError(err.message || 'Could not load word history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="wotd-history">
      {/* Header */}
      <div className="wotd-history-header">
        <span className="wotd-history-emoji">📚</span>
        <h2>Word History</h2>
        <p>All the amazing words you've learned so far!</p>
      </div>

      {/* Card List */}
      <div className="wotd-history-list">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-sm">
            <Loader2 className="animate-spin text-purple-500 mb-4" size={32} />
            <p className="text-gray-500 font-semibold">Loading history...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-50 p-6 rounded-2xl text-center shadow-sm">
            <p className="font-semibold">{error}</p>
          </div>
        ) : historyData.length > 0 ? (
          historyData.map((item) => (
            <div className="wotd-history-card" key={item.id || item.word}>
              {item.image_url ? (
                <img
                  className="wotd-history-thumb"
                  src={item.image_url}
                  alt={item.word}
                />
              ) : (
                <div className="wotd-history-thumb bg-purple-100 flex items-center justify-center text-purple-400 text-2xl font-bold">
                  {item.word.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="wotd-history-info">
                <h3 className="wotd-history-word">{item.word}</h3>
                <p className="wotd-history-meaning">{item.meaning}</p>
                <div className="wotd-history-date">{formatDate(item.date)}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 bg-white p-8 rounded-2xl text-center shadow-sm">
            <p className="font-semibold">No words in history yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordHistory;
