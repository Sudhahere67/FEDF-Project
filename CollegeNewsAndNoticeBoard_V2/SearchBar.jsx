// src/components/SearchBar.jsx

import React, { memo, useCallback } from "react";

function SearchBar({
  searchQuery,
  setSearchQuery,
}) {
  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <div
      className="search-box"
      role="search"
      aria-label="Notice Search"
    >
      <span className="tag-flag tag-search">
        Search
      </span>

      <input
        type="text"
        className="search-input"
        placeholder="Search by notice title..."
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label="Search Notices"
      />
    </div>
  );
}

export default memo(SearchBar);