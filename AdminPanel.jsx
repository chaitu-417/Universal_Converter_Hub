import React from 'react';
import SEOHead from '../../components/common/SEOHead';

const AdminPanel = () => {
  return (
    <div className="animate-fade-in">
      <SEOHead title="Admin Panel" />
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2>System Overview</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)' }}>Total Users</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>1,245</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)' }}>Active Conversions</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>84,392</p>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2>Manage Tools</h2>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: 'var(--glass-border)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 0' }}>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {['Length Converter', 'BMI Calculator', 'Password Generator'].map((item, i) => (
              <tr key={i} style={{ borderBottom: 'var(--glass-border)' }}>
                <td style={{ padding: '1rem 0' }}>{item}</td>
                <td>Basic</td>
                <td>Built-in</td>
                <td><span style={{ color: 'green' }}>Active</span></td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
