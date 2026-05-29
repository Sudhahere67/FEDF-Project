// src/components/Dashboard.jsx
import React from 'react';

export default function Dashboard({ categories, selectedCategory, setSelectedCategory, searchFilteredNotices }) {
  return (
    <div className="dashboard-panel">
      <h2 style={{marginBottom: '5px', fontSize:'22px'}}>Notice Board Feed</h2>
      <p style={{fontSize:'12px', color:'#777', marginBottom:'20px'}}>View live informational entries assigned to your department profile</p>

      {/* Category Tag Line */}
      <div className="category-bar">
        <span className="tag-flag tag-category">Category Tag</span>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notice Feed */}
      <div>
        {searchFilteredNotices.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px 20px', color:'#777', border:'1px dashed #ccc', borderRadius:'6px', background:'#fafafa'}}>
            ⚠️ No notices match the selected filter configuration.
          </div>
        ) : (
          searchFilteredNotices.map(notice => (
            <div key={notice.id} className="notice-card">
              <div style={{fontSize: '24px', paddingTop: '2px'}}>{notice.isAlert ? '⚠️' : '📄'}</div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start'}}>
                  <h4 style={{fontSize: '15px', color: '#111827', fontWeight: '700'}}>{notice.title}</h4>
                  <span className={`notice-status ${notice.isAlert ? 'status-alert' : 'status-published'}`}>
                    {notice.isAlert ? 'ALERT' : 'PUBLISHED'}
                  </span>
                </div>
                <p style={{fontSize: '11px', color: '#6b7280', margin: '4px 0', fontWeight: '600'}}>
                  <span style={{color:'#2563eb'}}>{notice.category}</span> • By {notice.author} • {notice.date}
                </p>
                <p style={{fontSize: '13px', marginTop: '8px', color: '#374151', lineHeight: '1.4'}}>{notice.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}