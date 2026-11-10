import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { converters, calculators, textTools, generators } from '../../utils/converterRegistry';
import ConverterCard from '../../components/common/ConverterCard';
import SEOHead from '../../components/common/SEOHead';
import { User, History, Star, BarChart } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const allTools = [...converters, ...calculators, ...textTools, ...generators];
  const favoriteTools = allTools.filter(t => favorites.includes(t.slug));

  return (
    <div className="animate-fade-in">
      <SEOHead title="Dashboard" />
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'var(--color-primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <User size={30} />
        </div>
        <div>
          <h1 style={{ margin: 0 }}>Welcome, {user?.name || 'User'}</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user?.email}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Star color="var(--color-primary)" size={30} />
          <div>
            <h3>Favorites</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{favorites.length}</p>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <History color="var(--color-primary)" size={30} />
          <div>
            <h3>History</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24 items</p>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BarChart color="var(--color-primary)" size={30} />
          <div>
            <h3>Usage</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>142 conversions</p>
          </div>
        </div>
      </div>

      <h2>Your Favorites</h2>
      {favoriteTools.length > 0 ? (
        <div className="cards-grid">
          {favoriteTools.map(tool => (
            <ConverterCard key={tool.slug} {...tool} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
