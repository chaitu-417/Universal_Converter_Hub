import React, { useState } from 'react';
import { convertRomanNumerals } from '../../utils/conversions/romanNumerals';

const RomanNumeralConverter = () => {
  const [mode, setMode] = useState('toRoman'); // toRoman or toNumber
  const [value, setValue] = useState('');

  const result = convertRomanNumerals(value, mode === 'toRoman');

  return (
    <div className="converter-container animate-fade-in">
      <div className="converter-header">
        <h1>Roman Numeral Converter</h1>
      </div>
      <div className="glass-card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            className={`btn ${mode === 'toRoman' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setMode('toRoman'); setValue(''); }}
            style={{ flex: 1 }}
          >Number to Roman</button>
          <button 
            className={`btn ${mode === 'toNumber' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setMode('toNumber'); setValue(''); }}
            style={{ flex: 1 }}
          >Roman to Number</button>
        </div>
        
        <div className="input-group">
          <label>{mode === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}</label>
          <input 
            type="text" 
            className="input-control" 
            value={value} 
            onChange={e => setValue(e.target.value.toUpperCase())} 
            placeholder={mode === 'toRoman' ? 'e.g. 2024' : 'e.g. MMXXIV'}
          />
        </div>

        {value && (
          <div className="result-box">
            <div className="result-value">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RomanNumeralConverter;
