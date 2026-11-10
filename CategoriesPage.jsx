import React from 'react';
import { Link } from 'react-router-dom';
import { converters } from '../utils/converterRegistry';
import SEOHead from '../components/common/SEOHead';

const CategoriesPage = () => {
  const categories = [...new Set(converters.map(c => c.category))];

  return (
    <div className="animate-fade-in">
      <SEOHead title="Categories" />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>All Categories</h1>
      <div className="cards-grid">
        {categories.map(cat => (
          <Link to={`/category/${cat}`} key={cat} className="glass-card" style={{ display: 'block', textTransform: 'capitalize' }}>
            <h2 style={{ color: 'var(--color-primary)', textAlign: 'center' }}>{cat}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
