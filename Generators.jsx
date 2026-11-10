import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const GeneratorRenderer = ({ slug }) => {
  switch (slug) {
    case 'password': return <PasswordGenerator />;
    case 'uuid': return <UUIDGenerator />;
    case 'qrcode': return <QRCodeGen />;
    default: return <div className="glass-card">Coming soon: {slug}</div>;
  }
};

const PasswordGenerator = () => {
  const [pwd, setPwd] = useState('');
  const [len, setLen] = useState(16);

  const generate = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let res = "";
    for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPwd(res);
  };

  return (
    <div className="glass-card">
      <div className="input-group"><label>Length: {len}</label><input type="range" min="8" max="64" value={len} onChange={e=>setLen(e.target.value)} /></div>
      <button className="btn btn-primary" onClick={generate} style={{width:'100%', marginTop:'1rem'}}>Generate Password</button>
      {pwd && <div className="result-box"><div className="result-value" style={{wordBreak:'break-all', fontSize:'1.5rem'}}>{pwd}</div></div>}
    </div>
  );
};

const UUIDGenerator = () => {
  const [uuid, setUuid] = useState('');
  const generate = () => {
    setUuid(crypto.randomUUID ? crypto.randomUUID() : 'Requires HTTPS / modern browser');
  };
  return (
    <div className="glass-card">
      <button className="btn btn-primary" onClick={generate} style={{width:'100%'}}>Generate UUID</button>
      {uuid && <div className="result-box"><div className="result-value" style={{fontSize:'1.5rem'}}>{uuid}</div></div>}
    </div>
  );
};

const QRCodeGen = () => {
  const [text, setText] = useState('https://converterhub.app');
  return (
    <div className="glass-card" style={{textAlign:'center'}}>
      <div className="input-group"><label>Text or URL</label><input type="text" className="input-control" value={text} onChange={e=>setText(e.target.value)} /></div>
      <div style={{marginTop:'2rem', background:'#fff', padding:'2rem', display:'inline-block', borderRadius:'1rem'}}>
        <QRCodeSVG value={text || ' '} size={200} />
      </div>
    </div>
  );
};
