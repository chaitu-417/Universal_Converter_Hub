import React, { useState } from 'react';

const converters = {
  Currency: {
    units: ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
    rates: { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.52, CAD: 1.36 },
    format: (v) => v.toFixed(2)
  },
  Length: {
    units: ['Meter', 'Kilometer', 'Centimeter', 'Mile', 'Foot', 'Inch'],
    rates: { Meter: 1, Kilometer: 0.001, Centimeter: 100, Mile: 0.000621, Foot: 3.28084, Inch: 39.3701 },
    format: (v) => v.toFixed(4)
  },
  Weight: {
    units: ['Kilogram', 'Gram', 'Pound', 'Ounce', 'Ton'],
    rates: { Kilogram: 1, Gram: 1000, Pound: 2.20462, Ounce: 35.274, Ton: 0.001 },
    format: (v) => v.toFixed(4)
  },
  Temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    rates: {},
    format: (v) => v.toFixed(2)
  },
  Area: {
    units: ['Sq Meter', 'Sq Kilometer', 'Sq Foot', 'Acre', 'Hectare'],
    rates: { 'Sq Meter': 1, 'Sq Kilometer': 0.000001, 'Sq Foot': 10.7639, Acre: 0.000247, Hectare: 0.0001 },
    format: (v) => v.toFixed(4)
  },
  Speed: {
    units: ['Km/h', 'Mph', 'M/s'],
    rates: { 'Km/h': 1, Mph: 0.621371, 'M/s': 0.277778 },
    format: (v) => v.toFixed(2)
  },
  Data: {
    units: ['MB', 'GB', 'KB', 'TB'],
    rates: { MB: 1, GB: 0.000976, KB: 1024, TB: 0.000000976 },
    format: (v) => v.toFixed(4)
  }
};

function convert(type, value, from, to) {
  if (!value) return '';
  const num = parseFloat(value);
  if (type === 'Temperature') {
    let c = num;
    if (from === 'Fahrenheit') c = (num - 32) * 5 / 9;
    if (from === 'Kelvin') c = num - 273.15;
    if (to === 'Celsius') return c;
    if (to === 'Fahrenheit') return c * 9 / 5 + 32;
    if (to === 'Kelvin') return c + 273.15;
  }
  const data = converters[type];
  const inBase = num / data.rates[from];
  return inBase * data.rates[to];
}

function App() {
  const [type, setType] = useState('Currency');
  const [value, setValue] = useState('100');
  const [from, setFrom] = useState(converters['Currency'].units[0]);
  const [to, setTo] = useState(converters['Currency'].units[1]);

  const changeType = (t) => {
    setType(t);
    setFrom(converters[t].units[0]);
    setTo(converters[t].units[1]);
  };

  const result = convert(type, value, from, to);
  const formatted = result === '' ? '' : converters[type].format(result);

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#1a1a2e' }}>🌐 Universal Converter Hub</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>Convert Anything, Instantly - Free & Fast</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
          {Object.keys(converters).map((t) => (
            <button key={t} onClick={() => changeType(t)} style={{ padding: '10px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: type === t ? '#4f46e5' : 'white', color: type === t ? 'white' : '#333', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0 }}>{type} Converter</h2>
          <label>Amount</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} type="number" style={{ width: '100%', padding: '14px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ddd', margin: '8px 0 16px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <label>From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', marginTop: '6px' }}>
                {converters[type].units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div style={{ fontSize: '24px', paddingBottom: '8px' }}>⇄</div>
            <div style={{ flex: 1 }}>
              <label>To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', marginTop: '6px' }}>
                {converters[type].units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div style={{ background: '#eef2ff', padding: '20px', borderRadius: '12px', marginTop: '22px', textAlign: 'center' }}>
            <div style={{ color: '#666', fontSize: '14px' }}>Result</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4f46e5' }}>{formatted} {to}</div>
            <div style={{ color: '#888', marginTop: '6px' }}>{value} {from} = {formatted} {to}</div>
          </div>
          <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '14px' }}>Currency rates are approximate for demo. For live rates, API can be added later.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center' }}><b>⚡ Instant</b><br /><small>No signup needed</small></div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center' }}><b>📱 Mobile Friendly</b><br /><small>Works on all devices</small></div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center' }}><b>🆓 100% Free</b><br /><small>Unlimited use</small></div>
        </div>
      </div>
    </div>
  );
}

export default App;
