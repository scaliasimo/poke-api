import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({ onSearch, setSearchActive }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleReset = () => {
    setSearch('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleFocus = () => {
    setSearchActive(true);
  };

  const handleBlur = () => {
    setSearchActive(false);
  };

  return (
    <SearchWrapper>
      <SearchInput
        type='text'
        value={search}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='Cerca il tuo Pokémon preferito...'
      />
      {search && (
        <ResetIcon
          src='/images/close.svg'
          alt='reset icon'
          onClick={handleReset}
        />
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 8px;
  padding-left: 12px;
  border-radius: 5px;
  flex-grow: 1;

  border: 2px solid #001111;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-family: 'Nunito', sans-serif;

  ::placeholder {
    color: #888;
  }
`;

const ResetIcon = styled.img`
  width: 30px;
  height: auto;
  margin-left: 8px;
  cursor: pointer;
`;

export default SearchBar;
