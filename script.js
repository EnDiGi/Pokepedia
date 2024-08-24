const baseUrl = "https://pokeapi.co/api/v2/";

searchBar = document.getElementById("searchBar");
searchBtn = document.getElementById("searchBtn");
urlInfo = document.getElementById("urlInfo");

pokemonSprite = document.getElementById("pokemonSprite");
pokemonName = document.getElementById("pokemonName");
pokemonType = document.getElementById("pokemonType");
pokemonId = document.getElementById("pokemonId");
pokemonWeight = document.getElementById("pokemonWeight");
pokemonHeight = document.getElementById("pokemonHeight");

elementsToShow = Array.from(document.getElementsByClassName("toShow"))

function capitalize(element){return element[0].toUpperCase() + element.slice(1)}

function displayData(data, url){
    urlInfo.textContent = "Url: " + url;
    console.log(data);

    pokemonType.textContent = "";

    elementsToShow.forEach(function(element){element.style.visibility = "visible"});

    pokemonName.textContent = capitalize(data.name.replace("-", " "));
    pokemonSprite.src = data.sprites.front_default;
    
    types = Array.from(data.types);
    types.forEach(function(element){pokemonType.textContent += capitalize(element.type.name) + "\n"});

    pokemonId.textContent = data.id;
    pokemonWeight.textContent = data.weight
    pokemonHeight.textContent = data.height
}

function displayError(error){
    urlInfo.textContent = "Pokemon not found";
    console.log(error)
}

function searchPokemon(name){
    const url = baseUrl + "pokemon/" + name.toLowerCase().replace(" ", "-");

    fetch(url)
         .then(response => response.json())
         .then(data => displayData(data, url))
         .catch(error => {displayError(error)})
}

searchBtn.onclick = function(){searchPokemon(searchBar.value)}

document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchPokemon(searchBar.value);
    }
})

searchPokemon("bulbasaur")