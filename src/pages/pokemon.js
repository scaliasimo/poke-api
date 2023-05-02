import React from 'react';
import { Router } from '@reach/router';
import PokemonDetail from '../components/PokemonDetails/PokemonDetails';

const PokemonPage = () => (
  <Router basepath={`${__PATH_PREFIX__}/pokemon`}>
    <PokemonDetail path='/:pokemonId' />
  </Router>
);

export default PokemonPage;
