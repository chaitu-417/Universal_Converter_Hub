import React, { useState } from 'react';
import { convertNumberSystem } from '../../utils/conversions/numberSystems';

const NumberSystemConverter = () => {
  const [value, setValue] = useState('10');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const bases = [
    { value: 2, label: 'Binary (Base 2)' },
    { value: 8, label: 'Octal (Base 8)' },
    { value: 10, label: 'Decimal (Base 10)' },
    { value: 16, label: 'Hexadecimal (Base 16)' }
  ];

  const result = convertNumberSystem(value, fromBase, toBase);

  return (
    <div className="converter-container animate-fade-in">
      <div className="converter-header">
        <h1>Number System Converter</h1>
      </div>
      <div className="glass-card">
        <div className="input-group">
          <label>Value</label>
          <input type="text" className="input-control" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label>From Base</label>
            <select className="input-control" value={fromBase} onChange={e => setFromBase(Number(e.target.value))}>
              {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>To Base</label>
            <select className="input-control" value={toBase} onChange={e => setToBase(Number(e.target.value))}>
              {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
        </div>
        <div className="result-box" style={{ marginTop: '2rem' }}>
          <h3>Result</h3>
          <div className="result-value">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemConverter;
