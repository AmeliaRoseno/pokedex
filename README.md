# Pokédex Diary

A simple web app for browsing Pokémon, catching your favorites, and keeping personal notes on each one — built with vanilla JavaScript, the DOM API, the Fetch API, Web Storage (localStorage), and TailwindCSS.

## Features

- **Homepage** — Browse a list of Pokémon fetched live from the [PokéAPI](https://pokeapi.co/), each shown with image, name, height, and weight.
- **Search** — Look up any Pokémon by name or numeric ID; results (or a "not found" message) are shown in a popup dialog.
- **Catch'em!** — Save a Pokémon to your personal collection, stored in the browser's localStorage.
- **Pokédex page** — View all the Pokémon you've caught, complete with a personal note field for each one.
- **Release** — Remove a Pokémon from your collection at any time.

## Tech stack

- HTML, vanilla JavaScript (no frameworks)
- [TailwindCSS](https://tailwindcss.com/) (via CDN) for styling
- [PokéAPI](https://pokeapi.co/) for Pokémon data
- Browser `localStorage` for persistence

## File structure
index.html → Homepage (Pokémon list + search)
main.js → Homepage logic
pokedex.html → Pokédex page (caught Pokémon)
pokedex.js → Pokédex page logic