import { createContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {

    const [pokemonsList, setPokemonsList] = useState([]);
    const [offset, setOffset] = useState(0); 
    const limit = 20; 

    const typeColors = {
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
        const loadPokemons = async () => {
            try {
                // Get pokemons urls
                const request = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
                );
                const data = await request.json();
                
                //Obtain specific data of each pokemon 
                const pokemonsData = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const request = await fetch(pokemon.url);
                        return request.json();
                    })
                );

                // Add new pokemons
                setPokemonsList( [...pokemonsList, ...pokemonsData]);

            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } 
        };

        loadPokemons();
    }, [offset]); 

    const loadMorePokemons = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

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
        <PokemonContext.Provider
         value={{ 
                pokemonsList, 
                refactorDetails, 
                typeColors, 
                requestData, 
                loadMorePokemons 
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;