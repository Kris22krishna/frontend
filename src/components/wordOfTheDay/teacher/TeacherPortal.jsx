import React, { useState, useRef } from 'react';
import { Send, ImagePlus, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { wordApi } from '../services/wordApi';
import './TeacherPortal.css';

const TeacherPortal = () => {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    sentence: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      image_url: imagePreview || "", // Send base64 or empty string
      user_id: user?.id || sessionStorage.getItem('userId') || 'system',
    };

    try {
      await wordApi.addWord(payload);
      alert('✅ Word published successfully!');
      // Reset form
      setFormData({
        word: '',
        meaning: '',
        sentence: '',
        date: new Date().toISOString().split('T')[0],
      });
      removeImage();
    } catch (err) {
      console.error('Failed to publish word:', err);
      setError(err.message || 'Failed to publish word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wotd-teacher-portal">
      <div className="wotd-teacher-card">
        {/* Header */}
        <div className="wotd-teacher-header">
          <span className="wotd-emoji">📖</span>
          <h1>Word of the Day</h1>
          <p>Create a new word for your students to learn!</p>
        </div>

        {/* Form */}
        <form className="wotd-teacher-form" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm mb-2">{error}</div>}
          
          {/* Word */}
          <div className="wotd-field">
            <label>
              <span className="wotd-label-icon">✏️</span> Word
            </label>
            <input
              type="text"
              name="word"
              placeholder="e.g. Serendipity"
              value={formData.word}
              onChange={handleChange}
              required
            />
          </div>

          {/* Meaning */}
          <div className="wotd-field">
            <label>
              <span className="wotd-label-icon">💡</span> Meaning
            </label>
            <textarea
              name="meaning"
              placeholder="Write the meaning of the word in simple language…"
              value={formData.meaning}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sentence */}
          <div className="wotd-field">
            <label>
              <span className="wotd-label-icon">📝</span> Use it in a sentence
            </label>
            <textarea
              name="sentence"
              placeholder="Write an example sentence using this word…"
              value={formData.sentence}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="wotd-field">
            <label>
              <span className="wotd-label-icon">🖼️</span> Image
            </label>
            <div className="wotd-image-upload-area">
              {imagePreview ? (
                <div className="wotd-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="wotd-remove-image"
                    onClick={removeImage}
                    title="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="wotd-upload-placeholder">
                  <ImagePlus size={32} className="wotd-upload-icon" />
                  <span>Click or drag to upload an image</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="wotd-field">
            <label>
              <span className="wotd-label-icon">📅</span> Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="wotd-publish-btn" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {loading ? 'Publishing...' : 'Publish Word'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherPortal;
