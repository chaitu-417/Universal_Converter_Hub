import React from 'react';
import { calculators } from '../utils/converterRegistry';
import ConverterCard from '../components/common/ConverterCard';
import SEOHead from '../components/common/SEOHead';

const CalculatorsPage = () => {
  return (
    <div className="animate-fade-in">
      <SEOHead title="Calculators" description="A collection of powerful calculators." />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Calculators</h1>
      <div className="cards-grid">
        {calculators.map(calc => (
          <ConverterCard key={calc.slug} {...calc} type="calculator" />
        ))}
      </div>
    </div>
  );
};

export default CalculatorsPage;
