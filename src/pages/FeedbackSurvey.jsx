import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';

const FeedbackSurvey = () => {
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  // ✅ Cleaned Google Review link (removed leading space)
  const googleReviewLink =
    'https://www.google.com/travel/search?q=Xpress%20Inn%20%26%20Extended%20Stay%20Marshall%20TX%20Near%20I-20%20E%20%26%20US%20Hwy%2059%2C%20300%20I-20%2C%20Marshall%2C%20TX%2075672%2C%20United%20States&ap=ugEHcmV2aWV3cw';

  const tripAdvisorLink =
    'https://www.tripadvisor.com/Hotel_Review-g56236-d28804568-Reviews-Xpress_Inn_Extended_Stays-Marshall_Texas.html';

  const handleRating = (value) => {
    setRating(value);

    setTimeout(() => {
      if (value === 'happy') {
        navigate('/ReviewRedirect', {
          state: {
            googleLink: googleReviewLink,
            tripAdvisorLink: tripAdvisorLink,
          },
        });
      } else {
        navigate('/PrivateFeedback');
      }
    }, 800);
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <div className="logo-section">
          <img
            src="https://xpressinnmarshall.com/wp-content/uploads/2023/09/xpressinn-main-sign.png"
            alt="Xpress Inn Logo"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
        </div>

        <h2 className="hotel-name">Xpress Inn Marshall</h2>
        <h3 className="question">How was your stay?</h3>

        <div className="rating-section">
          <button
            type="button"
            aria-label="Great experience"
            className={`emoji-btn ${rating === 'happy' ? 'selected' : ''}`}
            onClick={() => handleRating('happy')}
          >
            <div className="emoji-circle happy-circle">
              <span className="emoji">😊</span>
            </div>
            <span className="emoji-label">Great!</span>
          </button>

          <button
            type="button"
            aria-label="Not good experience"
            className={`emoji-btn ${rating === 'sad' ? 'selected' : ''}`}
            onClick={() => handleRating('sad')}
          >
            <div className="emoji-circle sad-circle">
              <span className="emoji">😞</span>
            </div>
            <span className="emoji-label">Not Good</span>
          </button>
        </div>

        {rating && (
          <div className="loading-message">
            <div className="spinner" />
            <p>Thank you for your feedback...</p>
          </div>
        )}

        <p className="appreciation-text">
          We appreciate your business. We'd love to hear what you think about your recent visit.
        </p>

        <div className="contact-info">
          <div>300 I-20, Marshall, TX</div>
          <div>+1 923-471-8277</div>
          <div>https://xpressinnmarshall.com</div>
        </div>

        <div className="powered-by">
          Powered by <span className="guesttouch">Xpress Inn</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSurvey;
