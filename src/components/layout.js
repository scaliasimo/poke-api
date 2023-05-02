import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { navigate } from 'gatsby';

const Layout = ({ children, setPokemonSearchQuery }) => {
  useEffect(() => {
    const onPopState = () => {
      navigate('/');
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <>
      <Navbar setPokemonSearchQuery={setPokemonSearchQuery} /> {children}
    </>
  );
};

export default Layout;
