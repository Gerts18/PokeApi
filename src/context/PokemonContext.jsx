import { createContext, useContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemonsList, setPokemonsList] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await request.json();
            setPokemonsList(data.results);
        };
        getPokemons();
    }, []);

    return (
        <PokemonContext.Provider value={{ pokemonsList }}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;