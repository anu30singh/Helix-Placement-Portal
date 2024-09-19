// SearchBar.jsx
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onChange }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(query);
    }, 500);  // 500ms delay for debouncing

    return () => clearTimeout(delayDebounceFn);
  }, [query, onChange]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a course..."
        className='px-5 rounded-full w-[350px] h-[50px] border-white border-[1px] border-solid bg-[#17181E] text-white placeholder:text-white'
      />
    </div>
  );
};

export default SearchBar;
