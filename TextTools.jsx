import React, { useState } from 'react';

export const TextToolRenderer = ({ slug }) => {
  switch (slug) {
    case 'word-counter': return <WordCounter />;
    case 'case-converter': return <CaseConverter />;
    case 'base64': return <Base64Encoder />;
    default: return <div className="glass-card">Coming soon: {slug}</div>;
  }
};

const WordCounter = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="glass-card">
      <textarea className="input-control" rows="8" value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste text here..."></textarea>
      <div style={{display:'flex', gap:'2rem', marginTop:'1rem'}}>
        <div><h3>Words</h3><p style={{fontSize:'2rem', color:'var(--color-primary)'}}>{words}</p></div>
        <div><h3>Characters</h3><p style={{fontSize:'2rem', color:'var(--color-primary)'}}>{chars}</p></div>
      </div>
    </div>
  );
};

const CaseConverter = () => {
  const [text, setText] = useState('');
  return (
    <div className="glass-card">
      <textarea className="input-control" rows="6" value={text} onChange={e=>setText(e.target.value)}></textarea>
      <div style={{display:'flex', gap:'1rem', marginTop:'1rem', flexWrap:'wrap'}}>
        <button className="btn btn-secondary" onClick={()=>setText(text.toUpperCase())}>UPPERCASE</button>
        <button className="btn btn-secondary" onClick={()=>setText(text.toLowerCase())}>lowercase</button>
        <button className="btn btn-secondary" onClick={()=>setText(text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))}>Title Case</button>
      </div>
    </div>
  );
};

const Base64Encoder = () => {
  const [text, setText] = useState('');
  const [res, setRes] = useState('');

  const encode = () => { try { setRes(btoa(text)); } catch { setRes('Invalid string'); } };
  const decode = () => { try { setRes(atob(text)); } catch { setRes('Invalid Base64'); } };

  return (
    <div className="glass-card">
      <textarea className="input-control" rows="4" value={text} onChange={e=>setText(e.target.value)} placeholder="Input string"></textarea>
      <div style={{display:'flex', gap:'1rem', margin:'1rem 0'}}>
        <button className="btn btn-secondary" onClick={encode}>Encode</button>
        <button className="btn btn-secondary" onClick={decode}>Decode</button>
      </div>
      {res && <textarea className="input-control" rows="4" value={res} readOnly></textarea>}
    </div>
  );
};
