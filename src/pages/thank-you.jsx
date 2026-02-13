import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './thank-you.css';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const type = location.state?.type || 'review';
  const message = location.state?.message || 'Thank you for your feedback!';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="animation-section">
          {type === 'private' ? (
            <div className="feedback-animation">
              <div className="feedback-icon">📝</div>
              <div className="feedback-waves">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
              </div>
            </div>
          ) : (
            <div className="success-animation">
              <div className="success-icon">
                <div className="checkmark">✓</div>
              </div>
              <div className="success-particles">
                <div className="particle particle1">⭐</div>
                <div className="particle particle2">🎉</div>
                <div className="particle particle3">✨</div>
                <div className="particle particle4">🌟</div>
              </div>
            </div>
          )}
        </div>

        <div className="content-section">
          <h1 className="main-title">
            {type === 'private' ? 'Feedback Received!' : 'Thank You!'}
          </h1>
          
          <p className="message">{message}</p>
          
          {type === 'private' ? (
            <div className="private-message">
              <div className="promise-box">
                <h3>Our Promise to You:</h3>
                <ul>
                  <li>✓ Management will review your feedback within 24 hours</li>
                  <li>✓ We'll work on addressing the issues you mentioned</li>
                  <li>✓ Your experience matters and helps us improve</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="review-message">
              <div className="appreciation-box">
                <h3>Your Review Helps:</h3>
                <div className="help-points">
                  <div className="help-point">
                    <span className="help-icon">🏨</span>
                    <span>Us improve our services</span>
                  </div>
                  <div className="help-point">
                    <span className="help-icon">👥</span>
                    <span>Other travelers make decisions</span>
                  </div>
                  <div className="help-point">
                    <span className="help-icon">⭐</span>
                    <span>Build trust in our community</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="action-section">
          <button className="home-btn" onClick={handleGoHome}>
            Back to Home
          </button>
          
          <div className="auto-redirect">
            <div className="countdown-circle">
              <span className="countdown-number">{countdown}</span>
            </div>
            <span className="countdown-text">Auto redirect in {countdown}s</span>
          </div>
        </div>

        <div className="hotel-info">
          <div className="logo-section">
            <img 
              style={{height:"60px", width:"90px"}}
              src="https://xpressinnmarshall.com/wp-content/uploads/2023/09/xpressinn-main-sign.png" 
              alt="Xpress Inn Logo" 
            />
          </div>
          
          <div className="contact-info">
            <div>Xpress Inn Marshall</div>
            <div>300 / 20 • +19234718277</div>
            <div>https://xpressinnmarshall.com/</div>
          </div>
        </div>

        <div className="powered-by" style={{color:"black"}}>
          Powered by <span className="guesttouch">GuestTouch</span>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;