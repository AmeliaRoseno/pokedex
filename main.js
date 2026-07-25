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

    // Assemble the card
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(height);
    card.appendChild(weight);

    // Add card to the page
    container.appendChild(card);
  });
}

getPokemonList();