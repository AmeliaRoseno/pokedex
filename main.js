async function getPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await response.json();
  const pokemonSummaries = data.results;

  const allDetails = await Promise.all(
    pokemonSummaries.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      return detailResponse.json();
    })
  );

  document.getElementById('loading-message').remove();
  renderPokemonCards(allDetails);
}

function renderPokemonCards(pokemonList) {
  const container = document.getElementById('pokemon-list');

  pokemonList.forEach((pokemon) => {
    // Card wrapper
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4 flex flex-col items-center';

    // Image
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.className = 'w-24 h-24';

    // Name
    const name = document.createElement('h2');
    name.textContent = pokemon.name;
    name.className = 'text-lg font-bold capitalize mt-2';

    // Height
    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon.height}`;
    height.className = 'text-sm text-gray-600';

    // Weight
    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight}`;
    weight.className = 'text-sm text-gray-600';

    // Catch button
    const catchButton = document.createElement('button');
    catchButton.textContent = "Catch'em!";
    catchButton.className = 'mt-3 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600';
    catchButton.addEventListener('click', () => {
      catchPokemon(pokemon);
    });

    // Assemble the card
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(height);
    card.appendChild(weight);
    card.appendChild(catchButton);

    // Add card to the page
    container.appendChild(card);
  });
}

getPokemonList();

function catchPokemon(pokemon) {
  const caught = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

  // Avoid catching the same Pokemon twice
  const alreadyCaught = caught.some((p) => p.name === pokemon.name);
  if (alreadyCaught) {
    alert(`You already caught ${pokemon.name}!`);
    return;
  }

  // Only store the fields we actually need (keeps localStorage lean)
  const pokemonToStore = {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((t) => t.type.name),
    note: '' // we'll use this in Step 7 for personal notes
  };

  caught.push(pokemonToStore);
  localStorage.setItem('caughtPokemon', JSON.stringify(caught));

  alert(`${pokemon.name} was caught!`);
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchDialog = document.getElementById('search-dialog');
const searchDialogContent = document.getElementById('search-dialog-content');
const searchDialogClose = document.getElementById('search-dialog-close');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  // Clear old content before showing new results
  searchDialogContent.textContent = '';

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error('Not found');
    }

    const pokemon = await response.json();

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.className = 'w-24 h-24 mx-auto';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;
    name.className = 'text-lg font-bold capitalize text-center';

    searchDialogContent.appendChild(image);
    searchDialogContent.appendChild(name);

  } catch (error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `No Pokémon found for "${query}".`;
    errorMessage.className = 'text-red-600';
    searchDialogContent.appendChild(errorMessage);
  }

  searchDialog.showModal();
});

searchDialogClose.addEventListener('click', () => {
  searchDialog.close();
});