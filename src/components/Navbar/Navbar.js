import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'gatsby';
import SearchBar from '../Search/SearchBar';

const Navbar = ({ setPokemonSearchQuery }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > lastScrollPos && isSticky) {
        setIsSticky(false);
      } else if (currentScrollPos < lastScrollPos && !isSticky) {
        setIsSticky(true);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos, isSticky]);

  return (
    <Wrapper isSticky={isSticky}>
      <Link
        to='/'
        style={{ textDecoration: 'none' }}
      >
        <MenuItem searchActive={searchActive}>
          <img
            src='../images/pokeball.svg'
            alt='Pokeball'
          />
        </MenuItem>
      </Link>
      <SearchBar
        onSearch={setPokemonSearchQuery}
        setSearchActive={setSearchActive}
      />
    </Wrapper>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  background: #fbf8ef;
  padding: 24px;
  border-radius: 10px;
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  padding-left: 27px;
  justify-content: space-between;
  grid-template-columns: auto 1fr auto;
  border: 5px solid #000111;
  box-shadow: 1px 1px 0 #000111, 2px 2px 0 #000111, 3px 3px 0 #000111,
    4px 4px 0 #000111, 5px 5px 0 #000111;
  position: sticky;
  top: 24px;
  z-index: 999;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  opacity: ${(props) => (props.isSticky ? 1 : 0)};
  transform: translateY(${(props) => (props.isSticky ? '0' : '-100%')});
  transition: all 0.2s ease-in-out;

  @media (max-width: 1199px) {
    margin: 0 24px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: auto;
    margin: 0;
    cursor: pointer;

    ${({ searchActive }) =>
      searchActive &&
      css`
        animation: ${spinAnimation} 1s linear infinite;
      `}
  }
`;

export default Navbar;
