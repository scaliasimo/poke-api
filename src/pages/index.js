import React, { useState } from 'react';
import './style.css';
import Layout from '../components/layout';
import PokemonList from '../components/List/PokemonList';

const IndexPage = () => {
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState('');

  return (
    <Layout setPokemonSearchQuery={setPokemonSearchQuery}>
      <PokemonList pokemonSearchQuery={pokemonSearchQuery} />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <title>DexApp | I tuoi Pokémon preferiti sempre a portata di mano</title>
);
