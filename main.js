// Load the readline library
const readline = require("readline");
// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

showMenu();

function showMenu() {
    rl.question("Enter Pokemon or Berries to search for or STOP:\n", (response) => {
        if(response.toLowerCase() === "pokemon"){
            rl.question("Enter name of Pokemon:\n", (response2) => {
                console.log("Searching Stats for: " + response2 + "!");
                searchPoke("pokemon/" + response2.toLowerCase(), (data) => {
                    console.log(data); //handle response from searchPokedex
                });
            });
        }else if(response.toLowerCase() === "berries"){
            rl.question("Enter name of Berry:\n", (response3) => {
               console.log("Searching for " + response3 + " Berry!");
               searchPoke("berry/" + response3.toLowerCase(), (data) => {
                  console.log(data); //handle response from searchPokedex
               });
            });
        }else if(response.toLowerCase() === "stop"){
            rl.close();
            return(0);
        }else{
            console.log("TYPO, please re-enter your response!");
            showMenu();
        }
    });
}


function searchPoke(term) {
    fetch("https://pokeapi.co/api/v2/" + term)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch pokemon.");
            }
            return response.json();
        })
        .then(data => console.log(data.id))
        .catch(error => console.error(error))
        .finally(() => {
            showMenu();
        });
}