import React, { useState, useEffect } from 'react';
import { X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { wordApi } from '../services/wordApi';
import './WordPopup.css';

const WordPopup = ({ data, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);

        // Fetch recent words (returns array of 7 most recent)
        const recentData = await wordApi.getRecentWords();
        const wordList = Array.isArray(recentData) ? recentData : [];

        if (wordList.length > 0) {
          setWords(wordList);
          // If single word data was passed, find its index
          if (data && data.word) {
            const idx = wordList.findIndex(w => w.word === data.word);
            setCurrentIndex(idx >= 0 ? idx : 0);
          } else {
            setCurrentIndex(0);
          }
        } else if (data && data.word) {
          // Fallback: use the single word passed as prop
          setWords([data]);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error('Failed to load words:', err);
        // Fallback to single word if recent fetch fails
        if (data && data.word) {
          setWords([data]);
          setCurrentIndex(0);
        } else {
          setError(err.message || 'Could not load the word of the day.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [data]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSlideDirection('slide-right');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setSlideDirection('');
      }, 200);
    }
  };

  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      setSlideDirection('slide-left');
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSlideDirection('');
      }, 200);
    }
  };

  if (!isOpen) return null;

  const currentWord = words[currentIndex];

  return (
    <div className="wotd-popup-overlay" onClick={handleClose}>
      <div
        className="wotd-popup-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="wotd-popup-close" onClick={handleClose} title="Close">
          <X size={18} />
        </button>

        {/* Left Arrow */}
        {words.length > 1 && (
          <button
            className={`wotd-nav-btn wotd-nav-left ${currentIndex === 0 ? 'wotd-nav-disabled' : ''}`}
            onClick={goToPrev}
            disabled={currentIndex === 0}
            title="Previous word"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Right Arrow */}
        {words.length > 1 && (
          <button
            className={`wotd-nav-btn wotd-nav-right ${currentIndex === words.length - 1 ? 'wotd-nav-disabled' : ''}`}
            onClick={goToNext}
            disabled={currentIndex === words.length - 1}
            title="Next word"
          >
            <ChevronRight size={22} />
          </button>
        )}

        <div className={`wotd-popup-content ${slideDirection}`}>
          {/* Badge */}
          <span className="wotd-popup-badge">⭐ Word of the Day</span>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
              <Loader2 className="wotd-spinner" size={32} />
              <p style={{ color: '#999', marginTop: '12px' }}>Loading words...</p>
            </div>
          ) : error ? (
            <div style={{ color: '#ef4444', background: '#fef2f2', padding: '16px', borderRadius: '12px', margin: '16px 0', textAlign: 'center' }}>
              <p>{error}</p>
            </div>
          ) : currentWord ? (
            <>
              {/* Word */}
              <h2 className="wotd-popup-word">{currentWord.word}</h2>

              {/* Date indicator */}
              {currentWord.date && (
                <p className="wotd-popup-date">{currentWord.date}</p>
              )}

              {/* Image */}
              {currentWord.image_url && (
                <img
                  className="wotd-popup-image"
                  src={currentWord.image_url}
                  alt={currentWord.word}
                />
              )}

              {/* Meaning */}
              <div className="wotd-popup-meaning">
                <div className="wotd-popup-label">Meaning</div>
                <p>{currentWord.meaning}</p>
              </div>

              {/* Sentence */}
              <div className="wotd-popup-sentence">
                <div className="wotd-popup-label">Example Sentence</div>
                <p>"{currentWord.sentence}"</p>
              </div>

              {/* Dot indicators */}
              {words.length > 1 && (
                <div className="wotd-dots">
                  {words.map((_, idx) => (
                    <span
                      key={idx}
                      className={`wotd-dot ${idx === currentIndex ? 'wotd-dot-active' : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: '#999', padding: '32px 0' }}>No word of the day published yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordPopup;
