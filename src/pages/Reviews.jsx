import React, { useState, useEffect } from 'react';

// Reviews component, accepts countryName and onClose callback as props
const Review = ({ countryName, onClose }) => {
  const currentUserId = 'user-123'; // Simulated user ID 

  // If no country is selected, shows a message
  if (!countryName) {
    return <div className="review-error">No country selected.</div>;
  }

  // Replaces spaces with underscores to safely use in localStorage keys
  const safeCountryName = countryName.replace(/\s+/g, '_');
  const storageKey = `reviews_${safeCountryName}`;

  // Local state for review list, input fields, and editing state
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);

  // Loads reviews from localStorage when the component mounts or country changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews([]);
    }
  }, [storageKey]);

  // Saves reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews, storageKey]);

  // Handles submitting a new review or updating an existing one
  const handleSubmit = () => {
    if (!text.trim()) {
      alert('Please enter a review.');
      return;
    }

    if (editingId) {
      // Updates existing review
      setReviews(reviews.map(r =>
        r.id === editingId ? { ...r, text, rating, date: new Date().toISOString() } : r
      ));
    } else {
      // Adds new review
      const newReview = {
        id: Date.now(),
        text,
        rating,
        date: new Date().toISOString(),
        helpful: 0,
        userId: currentUserId,
        helpfulVoters: []
      };
      setReviews([newReview, ...reviews]);
    }

    // Reset form
    setText('');
    setRating(5);
    setEditingId(null);
  };

  // Populates form with review data for editing
  const handleEdit = (id) => {
    const review = reviews.find(r => r.id === id);
    setText(review.text);
    setRating(review.rating);
    setEditingId(id);
  };

  // Deletes a review with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setText('');
        setRating(5);
      }
    }
  };

  // Marks review as helpful if not already voted by user
  const handleHelpful = (id) => {
    setReviews(reviews.map(r => {
      if (r.id === id) {
        if (r.helpfulVoters.includes(currentUserId)) return r;
        return {
          ...r,
          helpful: r.helpful + 1,
          helpfulVoters: [...r.helpfulVoters, currentUserId]
        };
      }
      return r;
    }));
  };

  return (
    <div className="overlay">
      <div className="review-container">

        <h2 className="review-heading">Reviews for {countryName}</h2>

        {/* Reviews input area */}
        <textarea
          rows={4}
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="review-textarea"
        />

        {/* Rating and submission controls */}
        <div className="review-controls">
          <label htmlFor="rating" className="rating-label">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-select"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>

          <button onClick={handleSubmit} className="submit-button">
            {editingId ? 'Update' : 'Submit'}
          </button>

          {/* Cancels editing */}
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setText('');
                setRating(5);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          )}
        </div>

        <hr className="divider" />

        {/* Displays list of reviews */}
        <div className="review-list">
          {reviews.length === 0 && (
            <p className="no-reviews">No reviews yet. Be the first!</p>
          )}

          {reviews.map(({ id, text, rating, date, helpful, userId, helpfulVoters }) => (
            <div key={id} className="review-item">
              {/* Star rating and date */}
              <div className="review-header">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
                <span className="review-date">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>

              {/* Reviews content */}
              <p className="review-text">{text}</p>

              {/* Reviews actions: helpful button, edit/delete for user */}
              <div className="review-actions">
                <button
                  className={`helpful-button ${helpfulVoters.includes(currentUserId) ? 'voted' : ''}`}
                  onClick={() => handleHelpful(id)}
                  disabled={helpfulVoters.includes(currentUserId)}
                >
                  👍 Helpful ({helpful})
                </button>

                {userId === currentUserId && (
                  <div className="edit-delete">
                    <button onClick={() => handleEdit(id)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
