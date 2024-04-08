// Load the readline library
const readline = require("readline");

// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

searchPokemon();

function searchPokemon() {
    rl.question("Enter Pokemon to search:\n", (response) => {
        console.log("Searching Stats for: " + response + "!");
        if(response.toLowerCase() === "stop"){
            rl.close();
            return;
        }
            searchPokedex(response.toLowerCase());
    });
}


function searchPokedex(pokemon) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch pokemon.");
            }
            return response.json();
        })
        .then(data => console.log(data.id))
        .catch(error => console.error(error))
        .finally(() => {
            searchPokemon();
        });
}