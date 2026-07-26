function loadCaughtPokemon() {
    const caught = JSON.parse(localStorage.getItem('caughtPokemon')) || [];
    renderCaughtPokemon(caught);
}

function renderCaughtPokemon(pokemonList) {
    const container = document.getElementById('caught-pokemon-list');
    container.textContent = ''; // Clear before re-rendering

    if (pokemonList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "You haven't caught You haven't caught any Pokémon yet. Go catch some on the Homepage!";
        emptyMessage.className = 'text-gray-500';
        container.appendChild(emptyMessage);
        return;
    }
    
    pokemonList.forEach((pokemon) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-4 flex flex-col items-center';

        const image = document.createElement('img');
        image.src = pokemon.image;
        image.alt = pokemon.name;
        image.className = 'w-24 h-24';

        const name = document.createElement('h2');
        name.textContent = pokemon.name;
        name.className = 'text-lg font-bold capitalize mt-2';

        const height = document.createElement('p');
        height.textContent = `Height: ${pokemon.height}`;
        height.className = 'text-sm text-gray-600';

        const weight = document.createElement('p');
        weight.textContent = `Weight: ${pokemon.weight}`;
        weight.className = 'text-sm text-gray-600';

        const types = document.createElement('p');
        types.textContent = `Type: ${pokemon.types.join(', ')}`;
        types.className = 'text-sm text-gray-600 capitalize';

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(height);
        card.appendChild(weight);
        card.appendChild(types);

        container.appendChild(card);
    });
}

loadCaughtPokemon();