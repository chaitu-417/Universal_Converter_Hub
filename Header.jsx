import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Moon, Sun, User, LogOut } from 'lucide-react';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: '900', fontSize: '1.6rem', color: 'var(--text-primary)' }}>I</span>
          <span style={{ color: '#1d4ed8', fontSize: '1.8rem', display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>♥</span>
          <span style={{ fontWeight: '900', fontSize: '1.6rem', color: 'var(--text-primary)' }}>CONVERT</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">HOME</NavLink>
          <NavLink to="/categories" className="nav-link">CATEGORIES</NavLink>
          <NavLink to="/calculators" className="nav-link">CALCULATORS</NavLink>
          <NavLink to="/text-tools" className="nav-link">TEXT TOOLS</NavLink>
          <NavLink to="/generators" className="nav-link">GENERATORS</NavLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
            <button onClick={toggleTheme} className="theme-toggle-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <Link to="/dashboard" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600 }}>DASHBOARD</Link>
                <button onClick={logout} className="logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/register" className="signup-btn">Sign up</Link>
              </>
            )}
            
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

