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

        // Note input
        const noteInput = document.createElement('textarea');
        noteInput.value = pokemon.note || '';
        noteInput.placeholder = 'Write a note about this Pokémon...';
        noteInput.className = 'mt-2 w-full border rounded p-2 text-sm';
        noteInput.rows = 2; 

        noteInput.addEventListener('change', () => {
            saveNote(pokemon.name, noteInput.value);
        });

        // Release button
        const releaseButton = document.createElement('button');
        releaseButton.textContent = 'Release';
        releaseButton.className = 'mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600';
        releaseButton.addEventListener('click', () => {
            releasePokemon(pokemon.name);
        });

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(height);
        card.appendChild(weight);
        card.appendChild(types);
        card.appendChild(noteInput);
        card.appendChild(releaseButton);

        container.appendChild(card);
    });
}

loadCaughtPokemon();

function saveNote(pokemonName, newNote) {
    const caught = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

    const updated = caught.map((pokemon) => {
        if (pokemon.name === pokemonName) {
            return { ...pokemon, note: newNote };
        }
        return pokemon;
    });

    localStorage.setItem('caughtPokemon', JSON.stringify(updated));
}

function releasePokemon(pokemonName) {
  const caught = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

  const updated = caught.filter((pokemon) => pokemon.name !== pokemonName);

  localStorage.setItem('caughtPokemon', JSON.stringify(updated));

  // Re-render the page immediately, without needing a manual reload
  renderCaughtPokemon(updated);
}