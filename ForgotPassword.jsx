import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="converter-container animate-fade-in" style={{ maxWidth: '400px' }}>
      <SEOHead title="Forgot Password" />
      <div className="glass-card">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Reset Password</h1>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>If an account with that email exists, we have sent a password reset link.</p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" required className="input-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
