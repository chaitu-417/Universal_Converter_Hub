import React, { useState } from 'react';

const ColorConverter = () => {
  const [hex, setHex] = useState('#6c5ce7');

  const hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return isNaN(r) ? null : `rgb(${r}, ${g}, ${b})`;
  };

  const rgb = hexToRgb(hex) || 'Invalid HEX';

  return (
    <div className="converter-container animate-fade-in">
      <div className="converter-header">
        <h1>Color Converter</h1>
      </div>
      <div className="glass-card">
        <div className="input-group">
          <label>Pick Color / Enter HEX</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="color" value={hex.length === 7 ? hex : '#000000'} onChange={e => setHex(e.target.value)} style={{ width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px' }} />
            <input type="text" className="input-control" value={hex} onChange={e => setHex(e.target.value)} />
          </div>
        </div>

        <div className="result-box" style={{ marginTop: '2rem', backgroundColor: hex, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hex.toUpperCase()}</div>
          <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{rgb}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
