import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          &copy; {new Date().getFullYear()} Universal Converter Hub. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Categories</Link>
          <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
