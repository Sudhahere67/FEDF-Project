// src/components/AdminPanel.jsx
import React from 'react';

export default function AdminPanel({ setViewForm, onManageNotices, onManageCategories, onManageUsers, onSystemSettings }) {
  return (
    <div className="sidebar-widget admin-action-block" style={{ position: 'relative', paddingTop: '20px' }}>
      <span className="tag-flag tag-admin" style={{ position: 'absolute', top: '-10px', right: '12px' }}>
        Admin Panel
      </span>

      <div className="widget-header-row">
        <h4 className="widget-title">Console Controls</h4>
        <span style={{ fontSize: '10px', color: '#db2777', fontWeight: '700', textTransform: 'uppercase' }}>
          Root Access
        </span>
      </div>

      {/* Main Notice Creation Toggle Form */}
      <button 
        type="button" 
        className="admin-primary-action-btn"
        onClick={() => setViewForm(true)}
      >
        <span>➕</span> Create New Notice
      </button>

      {/* Directory Management Operations List */}
      <div className="admin-control-list">
        <div className="admin-control-row" onClick={onManageNotices}>
          <div className="admin-control-label"><span>📝</span><span>Manage Notices</span></div>
          <span className="admin-control-meta">Active Feed</span>
        </div>
        
        <div className="admin-control-row" onClick={onManageCategories}>
          <div className="admin-control-label"><span>🏷️</span><span>Manage Categories</span></div>
          <span className="admin-control-meta">+ Add Tags</span>
        </div>
        
        <div className="admin-control-row" onClick={onManageUsers}>
          <div className="admin-control-label"><span>👥</span><span>Manage Users</span></div>
          <span className="admin-control-meta">Staff Roles</span>
        </div>
        
        <div className="admin-control-row" onClick={onSystemSettings}>
          <div className="admin-control-label"><span>⚙️</span><span>System Settings</span></div>
          <span className="admin-control-meta">Config V1</span>
        </div>
      </div>
    </div>
  );
}