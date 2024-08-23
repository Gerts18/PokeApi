import { createContext, useContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemonsUrls, setPokemonsUrls] = useState([]);
    const [pokemonsList, setPokemonsList] = useState([]);

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
    }, [pokemonsUrls])

    return (
        <PokemonContext.Provider value={{pokemonsList}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;