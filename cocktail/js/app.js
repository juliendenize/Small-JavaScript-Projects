const cocktailAPI = new CocktailAPI();
const cocktailDB = new CocktailDB();
const ui = new UI();
const searchForm = document.getElementById("search-form");

eventListeners()

function eventListeners() {
    
    // Starts documentReady function when the content is loaded
    document.addEventListener("DOMContentLoaded", documentReady);

    // if the search form exists, listen to a submit
    if(searchForm) searchForm.addEventListener("submit", getCocktails);


    //delegate to the result div the click events 
    const resultsDiv = document.getElementById("results");
    if(resultsDiv) {
        resultsDiv.addEventListener("click", resultsDelegation);
    }
}

// retrieve the cocktails after the form is submitted
function getCocktails (e) {
    e.preventDefault();
    
    // retrieve the content of the form input
    const searchTerm = document.getElementById("search").value;

    //if the user typed something
    if(searchTerm !== "") {
        let serverResponse;

        // type of research (by cocktail, by ingredient)
        const type = document.querySelector("#type").value;

        switch(type) {
            case "name":
                serverResponse = cocktailAPI.getCocktailsByName(searchTerm);     
            break;
            case "ingredient":
                serverResponse = cocktailAPI.getCocktailsByIngredient(searchTerm);
            break;
            case "category":
                serverResponse = cocktailAPI.getCocktailsByCategory(searchTerm);
            break;
            case "alcohol":
                serverResponse = cocktailAPI.getCocktailsByAlcohol(searchTerm);
            break;
        }


        //clear the previous results
        ui.clearResults();
        
        serverResponse
        .then(cocktails => {
            // if the request didn't find a cocktail
            if(cocktails === null) {
                ui.printMessage("No cocktails found, type something else.", "danger");
            }
            else {
                if(type === "name") {
                    ui.printCocktailsWithIngredients(cocktails);
                }
                //there are less information if the type of request isn't name
                else {
                   ui.printCocktailsWithoutIngredient(cocktails);
                }
            }
        })
        .catch(err => console.log(err));
    } else{
        ui.printMessage("Type something in the input.", "danger");
    }
}

function resultsDelegation(e) {
    e.preventDefault();
    // checks if the user clicked on a button that contains the class get-recipe
    if(e.target.classList.contains("get-recipe")) {
        cocktailAPI.getRecipe(e.target.dataset.id)
        .then(recipe => {
            ui.printRecipe(recipe)
        })
        .catch(err => console.log(err));
    }
    // checks if the user clicked on a favorite button 
    else if(e.target.classList.contains("favorite-btn")) {
        // if the user dislike the cocktail
        if(e.target.classList.contains("is-favorite")) {
            e.target.classList.remove("is-favorite");
            e.target.textContent = "+";

            //Remove from storage
            cocktailDB.removeFromDB(e.target.dataset.id);
        } else {
            e.target.classList.add("is-favorite");
            e.target.textContent = "-";

            // retrive the information to store them into the DB
            const cardBody = e.target.parentElement;
            const cocktailInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector(".card-title").textContent,
                image: cardBody.querySelector(".card-img-top").src
            }
            cocktailDB.saveIntoDB(cocktailInfo);
        }
    }
}

function documentReady() {
    const select = document.querySelector(".search-category");
    // if we are on the category page
    if(select) {
        cocktailAPI.getCategories()
        .then(categories => ui.printCategories(categories))
        .catch(err => console.log(err));
    } 

    // if we are in the favorite page
    const favoritesTable = document.querySelector("#favorites");
    if (favoritesTable) {
        const cocktails = cocktailDB.getFromDB();
        ui.printFavorites(cocktails)

        //event listener on favorites's page to view the recipe
        favoritesTable.addEventListener("click", e => {
            e.preventDefault();

            if(e.target.classList.contains("get-recipe")) {
                cocktailAPI.getRecipe(e.target.dataset.id)
                .then(recipe => {
                    ui.printRecipe(recipe)
                })
                .catch(err => console.log(err));
            } else if (e.target.classList.contains("remove-recipe")) {
                ui.removeFavorite(e.target.parentElement.parentElement);
                cocktailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}