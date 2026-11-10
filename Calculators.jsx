import React, { useState } from 'react';

export const CalculatorRenderer = ({ slug }) => {
  switch (slug) {
    case 'bmi': return <BMICalculator />;
    case 'age': return <AgeCalculator />;
    case 'percentage': return <PercentageCalculator />;
    default: return <div className="glass-card">Coming soon: {slug}</div>;
  }
};

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setBmi((w / (h * h)).toFixed(1));
  };

  return (
    <div className="glass-card">
      <div className="input-group"><label>Height (cm)</label><input type="number" className="input-control" value={height} onChange={e=>setHeight(e.target.value)} /></div>
      <div className="input-group"><label>Weight (kg)</label><input type="number" className="input-control" value={weight} onChange={e=>setWeight(e.target.value)} /></div>
      <button className="btn btn-primary" onClick={calculate} style={{width:'100%', marginTop:'1rem'}}>Calculate BMI</button>
      {bmi && <div className="result-box"><div className="result-value">{bmi}</div></div>}
    </div>
  );
};

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const calculate = () => {
    if(!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) years--;
    setAge(`${years} years old`);
  };

  return (
    <div className="glass-card">
      <div className="input-group"><label>Date of Birth</label><input type="date" className="input-control" value={dob} onChange={e=>setDob(e.target.value)} /></div>
      <button className="btn btn-primary" onClick={calculate} style={{width:'100%', marginTop:'1rem'}}>Calculate Age</button>
      {age && <div className="result-box"><div className="result-value">{age}</div></div>}
    </div>
  );
};

const PercentageCalculator = () => {
  const [val, setVal] = useState('');
  const [total, setTotal] = useState('');
  const [res, setRes] = useState('');

  const calc = () => {
    if(val && total) setRes(((parseFloat(val) / 100) * parseFloat(total)).toFixed(2));
  };

  return (
    <div className="glass-card">
      <div style={{display:'flex', gap:'1rem'}}>
        <div className="input-group" style={{flex:1}}><label>What is</label><input type="number" className="input-control" value={val} onChange={e=>setVal(e.target.value)} placeholder="%" /></div>
        <div className="input-group" style={{flex:1}}><label>of</label><input type="number" className="input-control" value={total} onChange={e=>setTotal(e.target.value)} /></div>
      </div>
      <button className="btn btn-primary" onClick={calc} style={{width:'100%', marginTop:'1rem'}}>Calculate</button>
      {res && <div className="result-box"><div className="result-value">{res}</div></div>}
    </div>
  );
};
