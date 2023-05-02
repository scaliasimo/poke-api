import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Card = ({ pokemonData, index }) => {
  const formattedNumber = (num) => {
    return num.toString().padStart(4, '0');
  };

  return (
    <Link
      to={`/pokemon/${pokemonData.id}`}
      style={{ textDecoration: 'none', color: '#000111' }}
    >
      <CardContainer>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`}
          alt={pokemonData.name}
        />
        <h2>{pokemonData.name}</h2>
        <p>#{formattedNumber(index + 1)}</p>
        <Type>
          {pokemonData.types &&
            pokemonData.types.map((type) => (
              <img
                key={type.type.name}
                src={`/images/types/${type.type.name}.svg`}
                alt={type.type.name}
              />
            ))}
        </Type>
      </CardContainer>
    </Link>
  );
};

const CardContainer = styled.div`
  background: #fbf8ef;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  border: 5px solid #000111;
  box-shadow: 1px 1px 0 #000111, 2px 2px 0 #000111, 3px 3px 0 #000111,
    4px 4px 0 #000111, 5px 5px 0 #000111;

  &:hover {
    background: #f6d51e;

    &:after {
      background: #f6d51e;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background-color: #fff;
      transition: all 0.5s;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      -o-transition: all 0.5s;
    }

    &:active {
      transform: translate(5px, 5px);
      box-shadow: 0 0 0 0;
    }
  }

  img {
    width: 160px;
    margin: 0 auto;
    display: block;
  }

  @media (max-width: 740px) {
    img {
      width: 100px;
    }

    @media (max-width: 390px) {
      img {
        width: 200px;
      }
    }
  }

  h2 {
    font-family: 'Nunito', sans-serif;
    text-transform: capitalize;
    font-weight: 800;
  }

  p {
    font-family: 'Nunito', sans-serif;
    margin-top: 8px;
  }
`;

const Type = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 8px;

  img {
    width: 50px;
    margin: 0;
  }
`;

export default Card;
