import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Card from '../Card/Card';

const PokemonList = ({ pokemonSearchQuery }) => {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searched, setSearched] = useState(false);
  const [filteredPokemonDataWithDetails, setFilteredPokemonDataWithDetails] =
    useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);

  const fetchPokemonData = async (url) => {
    const response = await axios.get(url);
    const results = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        return pokemonData.data;
      })
    );
    const newPokemonList = results.map((pokemon) => {
      return {
        ...pokemon,
        name: getPokemonName(pokemon),
      };
    });

    setTimeout(() => {
      setAllPokemonData((prevData) => [...prevData, ...newPokemonList]);
      setIsLoading(false);
    }, 1400);
    setHasMore(!!response.data.next);
  };

  const fetchAllPokemon = async () => {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=1008'
    );
    setAllPokemon(response.data.results);
  };

  useEffect(() => {
    fetchAllPokemon();
    fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=20');
  }, []);

  const getPokemonName = (pokemon) => {
    return pokemon.species.name;
  };

  const filteredPokemonData = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonSearchQuery.toLowerCase())
  );

  useEffect(() => {
    if (pokemonSearchQuery) {
      setIsSearching(true);
      setFilteredPokemonDataWithDetails([]);
      const fetchFilteredPokemonData = async () => {
        const fetchedData = await Promise.all(
          filteredPokemonData.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return {
              ...pokemonData.data,
              name: getPokemonName(pokemonData.data),
            };
          })
        );
        setFilteredPokemonDataWithDetails(fetchedData);
        setIsSearching(false);
        setHasMoreSearch(false);
      };
      fetchFilteredPokemonData();
      setSearched(true);
    } else {
      setSearched(false);
      setHasMoreSearch(true);
    }
  }, [pokemonSearchQuery]);

  const loadMoreData = async () => {
    if (searched) return;

    const newPokemonList = await Promise.all(
      filteredPokemonData
        .slice(allPokemonData.length, allPokemonData.length + 20)
        .map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return {
            ...pokemonData.data,
            name: getPokemonName(pokemonData.data),
          };
        })
    );

    setAllPokemonData((prevData) => [...prevData, ...newPokemonList]);
    setHasMore(allPokemonData.length + 20 < filteredPokemonData.length);
  };

  const loadMoreSearchData = async () => {
    const newPokemonList = await Promise.all(
      filteredPokemonData
        .slice(
          filteredPokemonDataWithDetails.length,
          filteredPokemonDataWithDetails.length + 20
        )
        .map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return {
            ...pokemonData.data,
            name: getPokemonName(pokemonData.data),
          };
        })
    );

    setFilteredPokemonDataWithDetails((prevData) => [
      ...prevData,
      ...newPokemonList,
    ]);
    setHasMoreSearch(
      filteredPokemonDataWithDetails.length + 20 < filteredPokemonData.length
    );
  };

  return (
    <InfiniteScroll
      dataLength={
        searched ? filteredPokemonDataWithDetails.length : allPokemonData.length
      }
      next={searched ? loadMoreSearchData : loadMoreData}
      hasMore={searched ? hasMoreSearch : hasMore}
      loader={
        !isSearching && (
          <SpinnerContainer key={0}>
            <img
              className='spinner'
              src='images/spinner.gif'
              alt='Loading spinner'
            />
          </SpinnerContainer>
        )
      }
      style={{ overflow: 'hidden' }}
    >
      <Wrapper>
        {(searched ? filteredPokemonDataWithDetails : allPokemonData).map(
          (pokemon, index) => (
            <Card
              key={pokemon.id}
              pokemonData={pokemon}
              index={pokemon.id - 1}
            />
          )
        )}
      </Wrapper>
    </InfiniteScroll>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  align-items: center;
  padding: 24px;
  overflow: hidden;
  max-width: 1200px;
  margin: 40px auto;

  @media (max-width: 985px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 740px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }

  @media (max-width: 390px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  height: auto;
  z-index: 10;

  .spinner {
    width: 100px;
    margin: 0 auto;
    display: block;
  }
`;

export default PokemonList;
