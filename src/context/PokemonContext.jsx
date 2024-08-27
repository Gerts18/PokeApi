import { createContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {

    const [allPokemons, setAllPokemons] = useState([]); 
    const [pokemonsList, setPokemonsList] = useState([]); 
    const [visibleCount, setVisibleCount] = useState(20); 

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
        const loadAllPokemons = async () => {
            try {
                const initialRequest = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
                const initialData = await initialRequest.json();

                const pokemonUrls = initialData.results.map((pokemon) => pokemon.url);

                const fetchPokemonBatch = async (urls) => {
                    return Promise.all(urls.map(async (url) => {
                        const request = await fetch(url);
                        return request.json();
                    }));
                };

                const batchSize = 20;
                let loadedPokemons = [];
                for (let i = 0; i < pokemonUrls.length; i += batchSize) {
                    const batchUrls = pokemonUrls.slice(i, i + batchSize);
                    const pokemonBatch = await fetchPokemonBatch(batchUrls);
                    loadedPokemons = [...loadedPokemons, ...pokemonBatch];
                    setAllPokemons(loadedPokemons); 
                }

                setPokemonsList(loadedPokemons.slice(0, visibleCount));

            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        loadAllPokemons();
    }, []);

    const loadMorePokemons = () => {
        setVisibleCount((prevCount) => {
            const newCount = prevCount + 20;
            setPokemonsList(allPokemons.slice(0, newCount));
            return newCount;
        });
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
                loadMorePokemons ,
                allPokemons
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;