import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function AuthModal({ onLogin, onClose }) {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {isLoginView ? (
          <>
            <Login onLogin={handleLogin} />
            <p className="text-center mt-3">
              Don't have an account? 
              <button 
                className="btn btn-link p-0 ml-1" 
                onClick={toggleView}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUp onSignUp={handleLogin} />
            <p className="text-center mt-3">
              Already have an account? 
              <button 
                className="btn btn-link p-0 ml-1" 
                onClick={toggleView}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;