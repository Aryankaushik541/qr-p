import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './happy.css';
import { FaHandPointDown } from "react-icons/fa";const ReviewRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [countdown, setCountdown] = useState(8);

  // Real links - replace with actual hotel IDs
  const googleLink = ' https://www.google.com/travel/search?q=Xpress%20Inn%20%26%20Extended%20Stay%20Marshall%20TX%20Near%20I-20%20E%20%26%20US%20Hwy%2059%2C%20300%20I-20%2C%20Marshall%2C%20TX%2075672%2C%20United%20States&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764%2C73107089%2C73192290%2C73249147&hl=en-IN&gl=in&ssta=1&ts=CAEaRwopEicyJTB4ODYzNmY3YTBiYzllOTBhZDoweDFiOTI4YWE0MWQ5MDg2ODISGhIUCgcI6g8QAhgFEgcI6g8QAhgGGAEyAhAA&qs=CAEyE0Nnb0lnbzNDN01IVW9za2JFQUU4AkIJCYKGkB2kipIbQgkJgoaQHaSKkhs&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwig14zp-quSAxUAAAAAHQAAAAAQBQ';
  const tripAdvisorLink = 'https://www.tripadvisor.com/Hotel_Review-g56236-d28804568-Reviews-Xpress_Inn_Extended_Stays-Marshall_Texas.html';

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 100000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoogleReview = () => {
    setSelectedPlatform('google');
    
    // Save feedback first
    saveFeedback('google');
    
    // Open Google review in new tab
    window.open(googleLink, '_blank');
    
    // Redirect to thank you page
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'review',
          message: 'Thank you for leaving a Google review! Your feedback helps other travelers.'
        }
      });
    }, 1500);
  };

  const handleTripAdvisorReview = () => {
    setSelectedPlatform('tripadvisor');
    
    // Save feedback first
    saveFeedback('tripadvisor');
    
    // Open TripAdvisor review in new tab
    window.open(tripAdvisorLink, '_blank');
    
    // Redirect to thank you page
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'review',
          message: 'Thank you for leaving a TripAdvisor review! Your feedback is valuable.'
        }
      });
    }, 1500);
  };

  const saveFeedback = async (platform) => {
    const feedbackData = {
      hotelName: 'Xpress Inn Marshall',
      overallRating: 'happy',
      platform: platform,
      timestamp: new Date().toISOString(),
      reviewType: 'external'
    };

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });
      
      if (!response.ok) {
        console.error('Failed to save feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      // Don't block the user flow if API fails
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="review-redirect-container">
      <div className="review-redirect-card">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          <div className="success-ripple"></div>
        </div>
        
        {/* Main Content */}
        <h2>Thank You!</h2>
        <p className="subtitle">We're thrilled you had a great stay! 🎉</p>
        
        <p className="description">
          Would you mind sharing your experience? Your review helps us improve and helps other travelers make informed decisions.
        </p>
        <p style={{fontSize:"50px",color:"#FFD700"}}><FaHandPointDown /></p>                     
        
        {/* Review Options */}
        <div className="review-options">
          <button 
            className={`review-btn google-btn ${selectedPlatform === 'google' ? 'clicked' : ''}`}
            onClick={handleGoogleReview}
            disabled={selectedPlatform !== null}
          >
            <div className="btn-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="btn-content">
              <div className="btn-title">Google Reviews</div>
              <div className="btn-subtitle">Share on Google Maps</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
          
          <button 
            className={`review-btn tripadvisor-btn ${selectedPlatform === 'tripadvisor' ? 'clicked' : ''}`}
            onClick={handleTripAdvisorReview}
            disabled={selectedPlatform !== null}
          >
            <div className="btn-icon tripadvisor-icon">
              <img 
                               style={{height:"40px", width:"40px"}}
                               src="https://cdn-icons-png.freepik.com/512/6124/6124989.png" 
                               alt="TripAdvisor" 
                           />
            </div>
            <div className="btn-content">
              <div className="btn-title">TripAdvisor</div>
              <div className="btn-subtitle">Share your experience</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
        </div>
        
        {/* Loading State */}
        {selectedPlatform && (
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Opening {selectedPlatform === 'google' ? 'Google Reviews' : 'TripAdvisor'}...</p>
          </div>
        )}
        
        {/* Action Buttons */}
       
        
        {/* Footer */}
        <div className="contact-info">
          <div>300 / 20 • +1 903-471-8277</div>
          <div>https://xpressinnmarshall.com/</div>
        </div>
        
        <div className="powered-b">
          Powered by <span className="guesttouch">Xpress Inn</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewRedirect;