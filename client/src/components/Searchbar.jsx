import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-800
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   shadow-sm text-gray-800"
      />
    </div>
  );
};

export default SearchBar;
