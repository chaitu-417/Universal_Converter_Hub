import React from 'react';
import { useParams } from 'react-router-dom';
import { converters } from '../utils/converterRegistry';
import ConverterCard from '../components/common/ConverterCard';
import SEOHead from '../components/common/SEOHead';

const CategoryPage = () => {
  const { slug } = useParams();
  const categoryTools = converters.filter(c => c.category === slug);

  return (
    <div className="animate-fade-in">
      <SEOHead title={`${slug} Converters`} />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', textTransform: 'capitalize' }}>{slug} Converters</h1>
      {categoryTools.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No converters found in this category.</p>
      ) : (
        <div className="cards-grid">
          {categoryTools.map(tool => (
            <ConverterCard key={tool.slug} {...tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
