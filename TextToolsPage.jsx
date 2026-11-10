import React from 'react';
import { textTools } from '../utils/converterRegistry';
import ConverterCard from '../components/common/ConverterCard';
import SEOHead from '../components/common/SEOHead';

const TextToolsPage = () => {
  return (
    <div className="animate-fade-in">
      <SEOHead title="Text Tools" description="A collection of powerful text tools." />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Text Tools</h1>
      <div className="cards-grid">
        {textTools.map(tool => (
          <ConverterCard key={tool.slug} {...tool} type="text-tool" />
        ))}
      </div>
    </div>
  );
};

export default TextToolsPage;
