import { createContext, useContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemonsUrls, setPokemonsUrls] = useState([]);
    const [pokemonsList, setPokemonsList] = useState([]);

    const typeColors ={
        fire: 'orange',
        water: 'lightblue',
        grass: 'lightgreen',
        electric: 'yellow',
        ice: 'lightblue',
        fighting: 'red',
        poison: 'blueviolet',
        ground: 'burlywood',
        flying: 'lightgrey',
        psychic: 'pink',
        bug: 'darkseagreen',
        rock: 'gray',
        ghost: 'indigo',
        dragon: 'purple',
        dark: 'darkslategray',
        steel: 'silver',
        fairy: 'pink',
        normal: 'beige'
    }

    useEffect(() => {
        const getPokemons = async () => {
            const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await request.json();
            setPokemonsUrls(data.results);
        };
        getPokemons();
    }, []);

    useEffect(() => {
        const getPokemonsData = async () => {
            const data = await Promise.all(
                pokemonsUrls.map(async (pokemon) => {
                    const request = await fetch(pokemon.url);
                    return request.json();
                })
            );
            setPokemonsList(data);
        };
        getPokemonsData();
    }, [pokemonsUrls]);
        
    const refactorDetails = (key, data) => {
        switch (key) {
            case 'id':
                return data.toString().padStart(3, '0');
            case 'name':
                return data.charAt(0).toUpperCase() + data.slice(1);
            case 'types':
                return data.types;
            default:
                return null;
         }
    }

    const requestData = async (url) => {
        try {
          const request = await fetch(url);
          const data = await request.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null; 
        }
      };

    return (
        <PokemonContext.Provider value={{pokemonsList, refactorDetails, typeColors, requestData}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;