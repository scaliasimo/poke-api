import * as React from 'react';
import { Link } from 'gatsby';

const pageStyles = {
  color: '#232129',
  padding: '32px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  minHeight: '100vh',
  maxWidth: '1000px',
  margin: '0 auto',
};

const pageStylesMobile = {
  flexDirection: 'column',
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 12,
  maxWidth: 320,
  fontSize: '30px',
  fontWeight: '800',
};

const bodyStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
};

const paragraphStyles = {
  marginBottom: 32,
  lineHeight: '1.2',
};

const imgStyles = {
  width: 'auto',
  height: '350px',
};

const NotFoundPage = () => {
  const getStyles = () => {
    if (typeof window === 'undefined') {
      return pageStyles;
    }

    const isMobile = window.innerWidth <= 768;
    return isMobile ? { ...pageStyles, ...pageStylesMobile } : pageStyles;
  };

  return (
    <main style={getStyles()}>
      <img
        src='/images/psyduck.png'
        alt='psyduck'
        style={imgStyles}
      />
      <div style={bodyStyles}>
        <h1 style={headingStyles}>Oh no, come ci sei finito qui?</h1>
        <p style={paragraphStyles}>
          Sembra che tu ti sia perso nel labirinto dei Pokémon. Non temere,
          anche Psyduck è confuso sul come tu sia arrivato in questa pagina!
          Segui il link qui sotto per tornare alla homepage.
        </p>
        <br />
        <Link to='/'>Torna indietro</Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head = () => <title>Dexapp - 404 | Contenuto non trovato</title>;
