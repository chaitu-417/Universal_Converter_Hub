import React from 'react';
import { generators } from '../utils/converterRegistry';
import ConverterCard from '../components/common/ConverterCard';
import SEOHead from '../components/common/SEOHead';

const GeneratorsPage = () => {
  return (
    <div className="animate-fade-in">
      <SEOHead title="Generators" description="A collection of powerful generators." />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Generators</h1>
      <div className="cards-grid">
        {generators.map(gen => (
          <ConverterCard key={gen.slug} {...gen} type="generator" />
        ))}
      </div>
    </div>
  );
};

export default GeneratorsPage;
