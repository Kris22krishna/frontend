// src/components/wordOfTheDay/services/wordApi.js

const BASE_URL = 'http://localhost:8000/api/v1/word';

// Helper for generic fetch requests
const fetchWrapper = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'API Error');
    }

    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  } catch (error) {
    console.error(`API Error on ${url}:`, error);
    throw error;
  }
};

export const wordApi = {
  // Add a new word of the day
  addWord: async (wordData) => {
    return fetchWrapper(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        word: wordData.word,
        meaning: wordData.meaning,
        sentence: wordData.sentence,
        image_url: wordData.image_url || '',
        date: wordData.date,
        user_id: wordData.user_id,
      }),
    });
  },

  // Get today's word
  getTodayWord: async () => {
    return fetchWrapper(`${BASE_URL}/today`, {
      method: 'GET',
    });
  },

  // Get recent words (history)
  getRecentWords: async () => {
    return fetchWrapper(`${BASE_URL}/recent`, {
      method: 'GET',
    });
  },
};
