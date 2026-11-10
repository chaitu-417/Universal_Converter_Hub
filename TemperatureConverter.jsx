import React, { useState, useEffect } from 'react';
import { convertTemperature, temperatureUnits } from '../../utils/conversions/temperature';
import { ArrowRightLeft } from 'lucide-react';

const TemperatureConverter = () => {
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [value, setValue] = useState('0');
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult(convertTemperature(value, fromUnit, toUnit));
  }, [value, fromUnit, toUnit]);

  return (
    <div className="converter-container animate-fade-in">
      <div className="converter-header">
        <h1>Temperature Converter</h1>
      </div>
      <div className="glass-card converter-body">
        <div className="conversion-row">
          <div className="conversion-col">
            <div className="input-group">
              <label>From</label>
              <input type="number" className="input-control" value={value} onChange={e => setValue(e.target.value)} />
              <select className="input-control" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
                {Object.keys(temperatureUnits).map(k => <option key={k} value={k}>{temperatureUnits[k].name}</option>)}
              </select>
            </div>
          </div>
          <button className="swap-btn" onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit); }}>
            <ArrowRightLeft size={24} />
          </button>
          <div className="conversion-col">
            <div className="input-group">
              <label>To</label>
              <input type="text" className="input-control" value={result} readOnly style={{ opacity: 0.8 }} />
              <select className="input-control" value={toUnit} onChange={e => setToUnit(e.target.value)}>
                {Object.keys(temperatureUnits).map(k => <option key={k} value={k}>{temperatureUnits[k].name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <div className="result-box animate-fade-in delay-1">
          <div className="result-value">{result}</div>
          <p style={{ color: 'var(--text-secondary)' }}>{temperatureUnits[toUnit].name}</p>
        </div>
      )}
    </div>
  );
};

export default TemperatureConverter;
