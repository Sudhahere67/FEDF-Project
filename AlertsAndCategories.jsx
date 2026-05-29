// src/components/AlertsAndCategories.jsx
import React from 'react';

export default function AlertsAndCategories({ notices }) {
  const alerts = notices.filter(n => n.isAlert);

  return (
    <div className="sidebar-widget sidebar-widget-alert">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Important Alerts</h3>
        <span className="tag-flag tag-alert">Alert Flag</span>
      </div>
      {alerts.map(alert => (
        <div key={alert.id} className="alert-item">
          <strong>{alert.title}</strong>
          <p style={{fontSize:'12px', marginTop:'4px'}}>{alert.content}</p>
        </div>
      ))}
    </div>
  );
}