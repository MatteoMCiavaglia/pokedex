// Load the readline library
const readline = require("readline");
// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

run();


function run(){
    showMenu();
}

function showMenu() {
    rl.question("Enter Pokemon, Moves, or Items to search for or STOP:\n", (response) => {    //ask user what to lookup and if they want to exit
        prompt(response);
    });
}

function prompt(response) {
    if (response.toLowerCase() === "pokemon") {       //if user typed pokemon prompt user for specific pokemon and return data
        rl.question("Enter Name or ID of Pokemon:\n", (response2) => {
            console.log("Searching Stats for: " + response2 + "!");
            searchPoke("pokemon/" + response2.toLowerCase(), (data) => {
                console.log(data); //handle response from searchPoke
            });
        });
    } else if (response.toLowerCase() === "moves") {     //if user typed berries then prompt user for specific berry and return data
        rl.question("Enter Name or ID of Move:\n", (response3) => {
            console.log("Searching for " + response3 + " Move!");
            searchPoke("move/" + response3.toLowerCase(), (data) => {
                console.log(data); //handle response from search
            });
        });
    }else if (response.toLowerCase() === "items") {     //if user typed berries then prompt user for specific berry and return data
            rl.question("Enter Name or ID of Item:\n", (response4) => {
                console.log("Searching for " + response4 + " Item!");
                searchPoke("item/" + response4.toLowerCase(), (data) => {
                    console.log(data); //handle response from searchPoke
                });
            });
    }else if(response.toLowerCase() === "stop"){        //close readline and program
        rl.close();
        return(0);

}else{      //catch typo re-prompt user
        console.log("TYPO, please re-enter your response!");
        showMenu();
    }
}


//Search functions

function searchPoke(term) {
    fetch("https://pokeapi.co/api/v2/" + term)
        .then(response => {
            if (!response.ok) {     //if response doesn't = ok then throw an error
                throw new Error("Could not fetch pokemon or berry.");
            }
            return response.json();
        })
        .then(data => {
            if(term.startsWith("pokemon")) {     //print out pokemon data neatly
                printPoke(data);
            }else if(term.startsWith("move")){
                printMove(data);
            }else if(term.startsWith("item")){
                printItem(data);
            }else{
                    console.log("Invalid search term.");
                    showMenu();
            }
        })
        .catch(error => console.error(error))
        .finally(() => {
            showMenu();
        });
}


function ssearchItem(term){

}

function searchMove(term){

}



//Print data functions

function printPoke(json){
        console.log("Name:", json.name);
        console.log("ID:", json.id);
        console.log("Base Experience:", json.base_experience);
        console.log("Height:", json.height);
        console.log("Weight:", json.weight);
        console.log("Types:");
    json.types.forEach(type => {
            console.log("- ", type.type.name);
        });
        console.log("Abilities:");
    json.abilities.forEach(ability => {
            console.log("- ", ability.ability.name, "(Hidden:", ability.is_hidden, ")");
        });
    }


function printItem(json){
    console.log("Name:", json.name);
    console.log("ID:", json.id);
    console.log("Category:", json.category)
    console.log("Cost:", json.cost);
    console.log("Fling Power:", json.fling_power);
}

function printMove(json){
    console.log("Name:", json.name);
    console.log("ID:", json.id);
    console.log("Type:", json.type);
    console.log("Accuracy:", json.accuracy);
    console.log("Power:", json.power);
    console.log("PP:", json.pp);
    console.log("Target:", json.target);
    console.log("Effect Chance:", json.effect_chance);
}
