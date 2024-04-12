// Load the readline library
const readline = require("readline");
// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

run(); //run the program


function run() {
    showMenu(); //calls showMenu function
}

function showMenu() {
    //ask user what to lookup and if they want to exit
    rl.question("Enter Pokemon, Moves, or Items to search for or STOP:\n", (response) => {
        prompt(response); //send response as parameter to prompt function
    });
}

function prompt(response) {
    //if-else statements to figure out what the user wants to look up
    if (response.toLowerCase() === "pokemon") {       //if user typed pokemon prompt user for specific pokemon
        rl.question("Enter Name or ID of Pokemon:\n", (response2) => {
            console.log("Searching Stats for: " + response2 + "!");
            searchPoke(response2.toLowerCase()); //searchPoke function call
        });
    } else if (response.toLowerCase() === "moves") {     //if user typed moves then prompt user for specific move
        rl.question("Enter Name or ID of Move:\n", (response3) => {
            console.log("Searching for " + response3 + " Move!");
            searchMove(response3.toLowerCase());  //searchMove function call
        });
    } else if (response.toLowerCase() === "items") {     //if user typed items then prompt user for specific item
        rl.question("Enter Name or ID of Item:\n", (response4) => {
            console.log("Searching for " + response4 + " Item!");
            searchItem(response4.toLowerCase());  //searchItem function call
        });
    } else if (response.toLowerCase() === "stop") {        //close readline and program
        rl.close();
        return (0);

    } else {      //catch typo re-prompt user
        console.log("TYPO, please re-enter your response!");
        showMenu();
    }
}


//Search functions

function searchPoke(term) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + term)
        .then(response => {
            if (!response.ok) {     //if response doesn't = ok then throw an error
                throw new Error("Could not fetch pokemon!");
            }
            return response.json(); //return and convert as json format
        })
        .then(data => {
            printPoke(data); //passes json data to printPoke function
        })
        .catch(error => console.error(error))
        .finally(() => {
            showMenu(); //after it calls printPoke and prints data it will then prompt the user again for a new lookup
        });
}

function searchMove(term) {
    fetch("https://pokeapi.co/api/v2/move/" + term)
        .then(response => {
            if (!response.ok) {     //if response doesn't = ok then throw an error
                throw new Error("Could not fetch move!");
            }
            return response.json(); //return and convert as json format
        })
        .then(data => {
            printMove(data);
        })
        .catch(error => console.error(error))
        .finally(() => {
            showMenu(); //after it calls printMove and prints data it will then prompt the user again for a new lookup
        });
}

function searchItem(term) {
    fetch("https://pokeapi.co/api/v2/item/" + term)
        .then(response => {
            if (!response.ok) {     //if response doesn't = ok then throw an error
                throw new Error("Could not fetch item!");
            }
            return response.json(); //return and convert as json format
        })
        .then(data => {
            printItem(data);
        })
        .catch(error => console.error(error))
        .finally(() => {
            showMenu(); //after it calls printItem and prints data it will then prompt the user again for a new lookup
        });
}


//Print data functions

function printPoke(json) {
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

function printMove(json) {
    console.log("Name:", json.name);
    console.log("ID:", json.id);
    console.log("Type:", json.type.name);
    console.log("Accuracy:", json.accuracy);
    console.log("Power:", json.power);
    console.log("PP:", json.pp);
    console.log("Target:", json.target.name);
}

function printItem(json) {
    console.log("Name:", json.name);
    console.log("ID:", json.id);
    console.log("Category:", json.category.name)
    console.log("Cost:", json.cost);
    console.log("Fling Power:", json.fling_power);
}