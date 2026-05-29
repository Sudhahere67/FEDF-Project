// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-box">
      <span className="tag-flag tag-search">Search</span>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search by notice title..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}