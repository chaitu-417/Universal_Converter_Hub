import React, { useState } from 'react';
import { converters, calculators, textTools, generators } from '../utils/converterRegistry';
import ConverterCard from '../components/common/ConverterCard';
import SEOHead from '../components/common/SEOHead';
import { Search } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allTools = [
    ...converters.map(c => ({ ...c, type: 'converter' })),
    ...calculators.map(c => ({ ...c, type: 'calculator' })),
    ...textTools.map(c => ({ ...c, type: 'text-tool' })),
    ...generators.map(c => ({ ...c, type: 'generator' }))
  ];

  // Filtering based on pill selection AND search query
  const getFilteredTools = () => {
    let tools = allTools;
    
    if (activeCategory !== 'all') {
      tools = tools.filter(t => t.type === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      tools = tools.filter(t => 
        t.title.toLowerCase().includes(term) || 
        t.description.toLowerCase().includes(term)
      );
    }
    
    return tools;
  };

  const filteredTools = getFilteredTools();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'converter', label: 'Converters' },
    { id: 'calculator', label: 'Calculators' },
    { id: 'text-tool', label: 'Text Tools' },
    { id: 'generator', label: 'Generators' }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <SEOHead title="Home" />
      
      <section className="hero-section" style={{ padding: '3.5rem 0 2rem', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
          Every tool you need to convert and calculate in one place
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem', lineHeight: '1.5' }}>
          Every tool you need for conversions, calculations, formatting text, and generating data. All are 100% FREE and easy to use! Convert, calculate, and generate with just a few clicks.
        </p>

        {/* Pill-shaped Category Selector */}
        <div className="category-pills" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchTerm(''); // Clear search on category change for better UX
              }}
              className={`pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cleaner, Minimal Search Box */}
        <div className="search-container" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
          <div className="search-input-wrapper" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Search className="search-icon" size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="search-input-minimal" 
              placeholder={`Search in ${activeCategory === 'all' ? 'all tools' : activeCategory + 's'}...`} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                fontSize: '0.95rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>
        </div>
      </section>

      <section>
        {filteredTools.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 0' }}>No tools found matching your search.</p>
        ) : (
          <div className="cards-grid-ilovepdf">
            {filteredTools.map(tool => (
              <ConverterCard key={tool.slug} {...tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

