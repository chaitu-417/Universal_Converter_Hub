import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

const NotFound = () => {
  return (
    <div className="converter-container animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <SEOHead title="404 Not Found" />
      <h1 style={{ fontSize: '6rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        The page or tool you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
