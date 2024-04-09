// Load the readline library
const readline = require("readline");
// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

showMenu();     //program start

function showMenu() {
    rl.question("Enter Pokemon or Berries to search for or STOP:\n", (response) => {    //ask user what to lookup and if they want to exit
        if(response.toLowerCase() === "pokemon"){       //if user typed pokemon prompt user for specific pokemon and return data
            rl.question("Enter Name or ID of Pokemon:\n", (response2) => {
                console.log("Searching Stats for: " + response2 + "!");
                searchPoke("pokemon/" + response2.toLowerCase(), (data) => {
                    console.log(data); //handle response from searchPokedex
                });
            });
        }else if(response.toLowerCase() === "berries"){     //if user typed berries then prompt user for specifc berry and return data
            rl.question("Enter Name or ID of Berry:\n", (response3) => {
               console.log("Searching for " + response3 + " Berry!");
               searchPoke("berry/" + response3.toLowerCase(), (data) => {
                  console.log(data); //handle response from searchPokedex
               });
            });
        }else if(response.toLowerCase() === "stop"){        //close readline and program
            rl.close();
            return(0);
        }else{      //catch typo re-prompt user
            console.log("TYPO, please re-enter your response!");
            showMenu();
        }
    });
}


function searchPoke(term) {
    fetch("https://pokeapi.co/api/v2/" + term)
        .then(response => {
            if (!response.ok) {     //if response doesn't = ok then throw an error
                throw new Error("Could not fetch pokemon.");
            }
            return response.json();
        })
        .then(data => {
            if(term.startsWith("pokemon")){     //print out pokemon data neatly
            console.log("Name:", data.name);
            console.log("ID:", data.id);
            console.log("Base Experience:", data.base_experience);
            console.log("Height:", data.height);
            console.log("Weight:", data.weight);
            console.log("Types:");
            data.types.forEach(type => {
                console.log("- ", type.type.name);
            });
            console.log("Abilities:");
            data.abilities.forEach(ability => {
                console.log("- ", ability.ability.name, "(Hidden:", ability.is_hidden, ")");
            });
        }else if (term.startsWith("berry")) {       //print out berries data neatly
        console.log("Name:", data.name);
        console.log("ID:", data.id);
        console.log("Growth Time:", data.growth_time);
        console.log("Max Harvest:", data.max_harvest);
        console.log("Natural Gift Power:", data.natural_gift_power);
        console.log("Size:", data.size);
        console.log("Smoothness:", data.smoothness);
        console.log("Soil Dryness:", data.soil_dryness);
    } else {
        console.log("Invalid search term.");
        showMenu();
    }
        })
        .catch(error => console.error(error))
        .finally(() => {
            showMenu();
        });
}