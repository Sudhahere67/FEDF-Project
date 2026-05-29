// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import NoticeForm from './NoticeForm';
import AlertsAndCategories from './AlertsAndCategories';
import SearchBar from './SearchBar';
import NotificationsAndArchive from './NotificationsAndArchive';
import AdminPanel from './AdminPanel';

const INITIAL_NOTICES = [
  { id: 1, title: "Mid Semester Examination Schedule", category: "Academic", author: "Admin", date: "20 May 2026", content: "The Mid Semester Examinations for all departments will commence from 3rd June 2026.", isAlert: false },
  { id: 2, title: "Important: College Timing Change", category: "General", author: "Admin", date: "18 May 2026", content: "Please note that the college timings will remain 9:00 AM to 3:00 PM from 20th May onwards.", isAlert: true },
  { id: 3, title: "Techfest 2026 - Registration Open", category: "Event", author: "Admin", date: "18 May 2026", content: "Registration for Techfest 2026 is now open. Register before the deadline.", isAlert: false },
  { id: 4, title: "Placement Drive by Infotech Ltd.", category: "Placement", author: "Admin", date: "17 May 2026", content: "Infotech Ltd. is conducting a placement drive for the 2026 batch on 25th May.", isAlert: false },
  { id: 5, title: "Annual Sports Day - 2026", category: "Event", author: "Admin", date: "16 May 2026", content: "Join us for the Annual Sports Day on 30th May 2026. All are welcome!", isAlert: false }
];

export default function App() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [categories, setCategories] = useState(['All', 'General', 'Academic', 'Examination', 'Event', 'Placement', 'Others']);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  
  // Real Filtering States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [archiveFilter, setArchiveFilter] = useState(''); // Holds months like "May 2026"

  const handleAddNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
    // If a brand new custom category was written in the form, add it to our tab bar automatically
    if (newNotice.category && !categories.includes(newNotice.category)) {
      setCategories([...categories, newNotice.category]);
    }
  };

  const handleManageNoticesClick = () => {
    setSearchQuery('');
    setArchiveFilter('');
    setSelectedCategory('All');
    setViewForm(false);
    alert("Viewing All Active Dashboard Notices.");
  };

  const handleManageCategoriesClick = () => {
    const newCat = prompt("Enter new category tag name to add globally:");
    if (newCat && newCat.trim() !== "") {
      if (categories.map(c => c.toLowerCase()).includes(newCat.toLowerCase().trim())) {
        alert("This category already exists!");
      } else {
        setCategories([...categories, newCat.trim()]);
      }
    }
  };

  const handleManageUsersClick = () => {
    alert("User management system online. 1,420 Student Roles & 45 Faculty accounts verified.");
  };

  const handleSystemSettingsClick = () => {
    alert("System Configurations: Notice Board Persistence engine active. Auto-archive threshold set to 30 days.");
  };

  // Global Centralized Filter Engine Core
  const searchFilteredNotices = notices.filter(notice => {
    // 1. Category check
    const matchesCategory = selectedCategory === 'All' || notice.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // 2. Search Text Query Check
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 3. Historical Archive Date Check
    const matchesArchive = !archiveFilter || notice.date.toLowerCase().includes(archiveFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesArchive;
  });

  return (
    <div>
      <header className="college-header">
        <div className="header-title">KLH University <span style={{fontSize:'14px', fontWeight:'normal'}}>News & Notice Board Portal</span></div>
        <button className="admin-btn" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Exit Admin Panel" : "Admin Login Access"}
        </button>
      </header>

      <main className="main-container">
        <div className="left-column">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          {/* Active Filtering Information Bar */}
          {(archiveFilter || searchQuery || selectedCategory !== 'All') && (
            <div style={{background: '#fff', padding: '10px 15px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <strong>Active Filters: </strong>
                {selectedCategory !== 'All' && <span className="tag-flag tag-category" style={{marginRight: '5px'}}>{selectedCategory}</span>}
                {searchQuery && <span className="tag-flag tag-search" style={{marginRight: '5px'}}>Keyword: "{searchQuery}"</span>}
                {archiveFilter && <span className="tag-flag tag-admin" style={{background: '#e0f2fe', color: '#0369a1', marginRight: '5px'}}>Timeline: {archiveFilter}</span>}
              </div>
              <button style={{background: '#8c1515', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}} onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setArchiveFilter(''); }}>
                Clear Filters ×
              </button>
            </div>
          )}
          
          {viewForm && isAdmin ? (
            <NoticeForm onAddNotice={handleAddNotice} onClose={() => setViewForm(false)} />
          ) : (
            <Dashboard 
              categories={categories}
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              searchFilteredNotices={searchFilteredNotices} 
            />
          )}
        </div>

        <div className="right-column">
          <AlertsAndCategories notices={notices} />
          
          {isAdmin && (
            <AdminPanel 
              setViewForm={setViewForm} 
              onManageNotices={handleManageNoticesClick}
              onManageCategories={handleManageCategoriesClick}
              onManageUsers={handleManageUsersClick}
              onSystemSettings={handleSystemSettingsClick}
            />
          )}
          
          <NotificationsAndArchive 
            setSearchQuery={setSearchQuery} 
            setArchiveFilter={setArchiveFilter} 
          />
        </div>
      </main>

      <footer className="college-footer">
        <p>© 2026 KLH University</p>
      </footer>
    </div>
  );
}