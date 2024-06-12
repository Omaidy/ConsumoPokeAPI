document.addEventListener('DOMContentLoaded', () => {
    const cajaPokemon = document.getElementById('cajaPokemon');

    async function obtenerPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Obtener 20 Pokémon
            if (!response.ok) {
                throw new Error('No se pudo obtener los Pokémon');
            }
            const data = await response.json();
            const pokemonList = data.results;
            
            pokemonList.forEach(async (pokemon) => {
                
                const pokemonData = await obtenerPokemonData(pokemon.url);
                
                mostrarPokemon(pokemonData);
            });
        } catch (error) {
            console.error('Error al obtener los Pokémon:', error);
        }
    }
    async function obtenerPokemonData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del Pokémon');
        }
        return await response.json();
    }

    
    function mostrarPokemon(pokemon) {
        const nombrePokemon = pokemon.name;
        const imgPokemonSrc = pokemon.sprites.front_default;

        const divPokemon = document.createElement('div');
        divPokemon.classList.add('bg-white', 'rounded-lg', 'overflow-hidden', 'shadow-md');

        const nombreElemento = document.createElement('h5');
        nombreElemento.classList.add('text-lg', 'font-semibold', 'text-center', 'py-2', 'bg-gray-200');
        nombreElemento.textContent = nombrePokemon;

        const imgElemento = document.createElement('img');
        imgElemento.classList.add('mx-auto', 'py-4');
        imgElemento.src = imgPokemonSrc;
        imgElemento.alt = nombrePokemon;

        
        divPokemon.appendChild(nombreElemento);
        divPokemon.appendChild(imgElemento);
        
        
        cajaPokemon.appendChild(divPokemon);
    }

    
    obtenerPokemon();
});
