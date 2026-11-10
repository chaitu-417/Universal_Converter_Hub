import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const UnitConverter = ({ title, units, convertFn }) => {
  const unitKeys = Object.keys(units);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1] || unitKeys[0]);
  const [value, setValue] = useState('1');
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult(convertFn(value, fromUnit, toUnit));
  }, [value, fromUnit, toUnit, convertFn]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="converter-container animate-fade-in">
      <div className="converter-header">
        <h1>{title}</h1>
      </div>
      <div className="glass-card converter-body">
        <div className="conversion-row">
          <div className="conversion-col">
            <div className="input-group">
              <label>From</label>
              <input 
                type="number" 
                className="input-control" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Enter value"
              />
              <select 
                className="input-control" 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {unitKeys.map(k => <option key={k} value={k}>{units[k].name}</option>)}
              </select>
            </div>
          </div>
          
          <button className="swap-btn" onClick={handleSwap}>
            <ArrowRightLeft size={24} />
          </button>

          <div className="conversion-col">
            <div className="input-group">
              <label>To</label>
              <input 
                type="text" 
                className="input-control" 
                value={result} 
                readOnly 
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)' }}
              />
              <select 
                className="input-control" 
                value={toUnit} 
                onChange={(e) => setToUnit(e.target.value)}
              >
                {unitKeys.map(k => <option key={k} value={k}>{units[k].name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <div className="result-box animate-fade-in delay-1">
          <div className="result-value">{result}</div>
          <p style={{ color: 'var(--text-secondary)' }}>{units[toUnit].name}</p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
