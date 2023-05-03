import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProgressBar from '../ProgressBar/ProgressBar';

const PokemonDetail = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonId]);

  const mainType = () => {
    if (pokemonData) {
      return pokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type
        .pokemon_v2_typenames[0].name;
    }
    return '';
  };

  const fetchPokemonData = async () => {
    const query = `
      query GetPokemon($pokemonId: Int!) {
        pokemon_v2_pokemon_by_pk(id: $pokemonId) {
          name
          height
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              pokemon_v2_typenames(where: {language_id: {_eq: 9}}) {
                name
              }
            }
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              pokemon_v2_statnames(where: {language_id: {_eq: 8}}) {
                name
              }
            }
          }
          pokemon_v2_pokemonmoves {
            pokemon_v2_move {
              name
              pokemon_v2_movenames(where: {language_id: {_in: [8, 9]}}) {
                name
                language_id
              }
              pokemon_v2_moveflavortexts(where: {language_id: {_eq: 8}}) {
                flavor_text
              }
            }
          }     
          pokemon_v2_pokemonspecy {
            pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 8}}) {
              flavor_text
            }
          }
        }
      }
    `;

    try {
      const response = await axios.post(
        'https://beta.pokeapi.co/graphql/v1beta',
        { query, variables: { pokemonId: parseInt(pokemonId) } }
      );
      setPokemonData(response.data.data.pokemon_v2_pokemon_by_pk);
    } catch (error) {}
  };

  const removeDuplicateMoves = (pokemonMoves) =>
    pokemonMoves.reduce((uniqueMoves, pokemonMove) => {
      const move = pokemonMove.pokemon_v2_move;
      if (!uniqueMoves.some((um) => um.pokemon_v2_move.name === move.name)) {
        uniqueMoves.push(pokemonMove);
      }
      return uniqueMoves;
    }, []);

  const getMoveName = (movenames) => {
    const moveName =
      movenames.find((movename) => movename.language_id === 8) ||
      movenames.find((movename) => movename.language_id === 9);
    return moveName ? moveName.name : 'N/A';
  };

  const formatPokemonName = (name) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const convertSpritePathToUrl = (path) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  const formatPokemonId = (id) => {
    return id.toString().padStart(4, '0');
  };

  if (!pokemonData) {
    return (
      <SpinnerContainer>
        <img
          className='spinner'
          src='/images/spinner.gif'
          alt='Loading spinner'
        />
      </SpinnerContainer>
    );
  }

  const getTypeColor = (type) => {
    const colors = {
      grass: 'rgb(87, 183, 116)',
      poison: 'rgb(196, 122, 178)',
      fire: 'rgb(255, 154, 94)',
      water: 'rgb(94, 164, 255)',
      flying: 'rgb(168, 144, 240)',
      bug: 'rgb(166, 198, 77)',
      normal: 'rgba(165, 164, 119, 0.69)',
      electric: 'rgb(255, 227, 0)',
      ground: 'rgb(196, 152, 70)',
      fairy: 'rgb(255, 175, 224)',
      dark: 'rgb(68, 68, 68)',
      dragon: 'rgb(151, 125, 213)',
      fighting: 'rgb(255, 73, 63)',
      ghost: 'rgb(157, 132, 196)',
      ice: 'rgb(173, 202, 202)',
      psychic: 'rgb(172, 84, 110)',
      rock: 'rgb(121, 109, 55)',
      steel: 'rgb(112, 112, 128)',
    };

    return colors[type.toLowerCase()] || 'rgb(255, 255, 255)';
  };

  return (
    <Wrapper>
      <Hero backgroundColor={getTypeColor(mainType())}>
        {' '}
        <IntroWrapper>
          <ReturnToHomepage>
            <Link to='/'>
              <img
                src='/images/back.svg'
                alt='Back'
              />
            </Link>
          </ReturnToHomepage>
          <h1>{formatPokemonName(pokemonData.name)}</h1>
          <h1>#{formatPokemonId(pokemonId)}</h1>
          <Types>
            {pokemonData.pokemon_v2_pokemontypes.map((pokemonType, index) => (
              <React.Fragment key={index}>
                {index > 0}
                <img
                  src={`/images/types/${pokemonType.pokemon_v2_type.pokemon_v2_typenames[0].name.toLowerCase()}.svg`}
                  alt={pokemonType.pokemon_v2_type.pokemon_v2_typenames[0].name}
                />
              </React.Fragment>
            ))}
          </Types>
        </IntroWrapper>
        <Sprite
          src={convertSpritePathToUrl()}
          alt={`${pokemonData.name} sprite`}
        />
      </Hero>

      <StyledTabsContainer
        selectedIndex={activeTab}
        onSelect={(index) => setActiveTab(index)}
      >
        <StyledTabList>
          <StyledTab>Caratteristiche</StyledTab>
          <StyledTab>Statistiche</StyledTab>
          <StyledTab>Mosse</StyledTab>
        </StyledTabList>

        <StyledTabPanel>
          <Caratteristiche>
            <p>
              {pokemonData.pokemon_v2_pokemonspecy
                .pokemon_v2_pokemonspeciesflavortexts[0]
                ? pokemonData.pokemon_v2_pokemonspecy
                    .pokemon_v2_pokemonspeciesflavortexts[0].flavor_text
                : 'Nessuna descrizione disponibile al momento :('}
            </p>
            <GridElementCaratteristiche>
              {' '}
              <h2>Altezza</h2> <p>{pokemonData.height / 10} m</p>
            </GridElementCaratteristiche>
            <GridElementCaratteristiche>
              <h2>Peso</h2> <p>{pokemonData.weight / 10} kg</p>
            </GridElementCaratteristiche>
          </Caratteristiche>
        </StyledTabPanel>
        <StyledTabPanel>
          {pokemonData.pokemon_v2_pokemonstats.map((pokemonStat, index) => (
            <GridElementStats key={index}>
              <h2>
                {pokemonStat.pokemon_v2_stat.pokemon_v2_statnames[0].name}{' '}
              </h2>
              <p>{pokemonStat.base_stat}</p>
              <ProgressBar
                value={pokemonStat.base_stat}
                maxValue={200}
              />
            </GridElementStats>
          ))}
        </StyledTabPanel>
        <StyledTabPanel>
          <MovesetGrid>
            {removeDuplicateMoves(pokemonData.pokemon_v2_pokemonmoves).map(
              (pokemonMove, index) => (
                <Moves key={index}>
                  <h2>
                    {getMoveName(
                      pokemonMove.pokemon_v2_move.pokemon_v2_movenames
                    )}
                  </h2>
                  <p>
                    {pokemonMove.pokemon_v2_move.pokemon_v2_moveflavortexts[0]
                      ? pokemonMove.pokemon_v2_move
                          .pokemon_v2_moveflavortexts[0].flavor_text
                      : 'Nessuna descrizione disponibile al momento :('}
                  </p>
                </Moves>
              )
            )}
          </MovesetGrid>
        </StyledTabPanel>
      </StyledTabsContainer>
    </Wrapper>
  );
};

export default PokemonDetail;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

const Hero = styled.div`
  margin: 40px 0;
  padding: 64px 0;
  background: ${(props) => props.backgroundColor} url('/images/pokeball-bg.svg')
    no-repeat calc(100% - 20px) calc(100% - 20px);
  background-size: 30% auto;
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 20px;

  @media (max-width: 900px) {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin: 0;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 32px 0;
    background-size: 60% auto;
  }

  @media (max-width: 465px) {
    background-size: 80% auto;
  }
`;

const ReturnToHomepage = styled.div`
  margin-top: -8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    font-size: 24px;
    color: #fff;
    font-weight: 800;
  }

  img {
    width: 68px;
    cursor: pointer;
  }
`;

const IntroWrapper = styled.div`
  h1 {
    font-size: 40px;
    color: #fff;
    font-weight: 800;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    margin-left: 30px;

    h1 {
      font-size: 50px;
    }
  }
`;

const Sprite = styled.img`
  max-width: 450px;
  width: 380px;
  border-radius: 10px;
  margin: 0 24px;

  @media (max-width: 768px) {
    display: block;
    margin: 0 auto;
    width: 450px;
  }

  @media (max-width: 450px) {
    width: 400px;
  }
`;

const Types = styled.div`
  display: flex;
  gap: 14px;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  gap: 32px;
  background: white;
  position: relative;
  position: sticky;
  top: 0;
  padding: 32px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;

  scrollbar-width: none;

  @media (max-width: 495px) {
    gap: 8px;
    padding: 24px;
    flex-wrap: nowrap;
  }
`;

const StyledTabsContainer = styled(Tabs)`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-height: 350px;
  height: 350px;
  margin-bottom: 50px;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (max-width: 760px) {
    margin-top: -50px;
    margin-bottom: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const StyledTab = styled(Tab)`
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: #333;
  cursor: pointer;
  padding-bottom: 6px;
  padding: 10px 20px;

  @media (max-width: 760px) {
    font-size: 18px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(72, 117, 176, 0.15);
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
    transition: background 0.5s;
  }

  &.react-tabs__tab--selected {
    background: rgba(72, 117, 176, 0.15);
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
    transition: background 0.5s;
  }

  &.react-tabs__tab {
    display: inline-block;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  transition: all 3s ease-out;
  padding: 0 32px;

  @media (max-width: 495px) {
    padding: 0 16px;
  }
`;

const Caratteristiche = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 18px;

  p {
    margin-bottom: 24px;
  }
`;

const GridElementCaratteristiche = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }

  p {
    font-size: 18px;
    color: #333;
  }

  @media (max-width: 768px) {
    grid-template-columns: 30% 70%;
  }
`;

const GridElementStats = styled.div`
  display: grid;
  grid-template-columns: 25% 10% 65%;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  margin-bottom: 24px;
  align-items: center;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }

  p {
    font-size: 18px;
    color: #333;
  }

  @media (max-width: 768px) {
    grid-template-columns: 40% 10% 50%;
  }
`;

const MovesetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 350px) {
    grid-template-columns: repeat(1, auto);
  }
`;

const Moves = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  margin-bottom: 24px;
  background: rgba(72, 117, 176, 0.15);
  padding: 15px;
  border-radius: 10px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  .spinner {
    width: 100px;
    margin: 0 auto;
    display: block;
  }
`;
