import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolBySlug } from '../utils/converterRegistry';
import SEOHead from '../components/common/SEOHead';
import { CalculatorRenderer } from '../components/calculators/Calculators';
import { TextToolRenderer } from '../components/textTools/TextTools';
import { GeneratorRenderer } from '../components/generators/Generators';

const ToolPage = ({ type }) => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug, type);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const renderContent = () => {
    if (type === 'calculator') return <CalculatorRenderer slug={slug} />;
    if (type === 'text-tool') return <TextToolRenderer slug={slug} />;
    if (type === 'generator') return <GeneratorRenderer slug={slug} />;
    return <div>Invalid tool type</div>;
  };

  return (
    <div className="converter-container animate-fade-in">
      <SEOHead title={tool.title} description={tool.description} />
      <div className="converter-header">
        <h1>{tool.title}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{tool.description}</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default ToolPage;
