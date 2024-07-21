import React from 'react';
import './App.css';

const App = () => {
  const metrics = [
    { name: 'Completeness', value: 90.0, color: '#27ae60' },
    { name: 'Uniqueness', value: 87.6, color: '#f1c40f' },
    { name: 'Timeliness', value: 100.0, color: '#27ae60' },
    { name: 'Consistency', value: 99.8, color: '#27ae60' },
    { name: 'Validity', value: 95.1, color: '#27ae60' },
    { name: 'Integrity', value: 33.3, color: '#e67e22' },
    { name: 'Conformity', value: 95.7, color: '#27ae60' },
  ];

  return (
    <div className="data-quality-metrics">
      <div className="rings-container">
        {metrics.map((metric, index) => (
          <div
            key={metric.name}
            className="ring"
            style={{
              background: `conic-gradient(${metric.color} 0deg ${metric.value * 3.6}deg, #ecf0f1 ${metric.value * 3.6}deg 360deg)`,
              width: `${320 - index * 40}px`,
              height: `${320 - index * 40}px`,
            }}
          />
        ))}
      </div>
      <div className="legend">
        {metrics.map((metric) => (
          <div key={metric.name} className="legend-item">
            <span className="color-indicator" style={{ backgroundColor: metric.color }}></span>
            <span className="metric-name">{metric.name}</span>
            <span className="metric-value">{metric.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
