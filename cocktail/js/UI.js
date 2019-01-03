class UI {

    printCocktailsWithIngredients(cocktails) {
        const resultsWrapper = document.querySelector(".results-wrapper");
        resultsWrapper.style.display = "block";
        
        const resultsDiv = document.querySelector("#results");

        cocktails.forEach(cocktail => {
            resultsDiv.innerHTML += 
            `
            <div class="col-md-6">
                <div class="card my-3">
                    <button type="button" data-id="${cocktail.idDrink}" class="favorite-btn btn btn-outline-info">
                    +
                    </button>
                    <img class="card-img-top" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">

                    <div class="card-body">
                        <h2 class="card-title text-center">${cocktail.strDrink}</h2>
                        <p class="card-text font-weight-bold">Instructions: </p>
                        <p class="card-text">
                                ${cocktail.strInstructions}
                        </p>
                        <p class="card-text">
                            <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li>
                                    ${this.printIngredients(cocktail)}
                            </ul>
                        </p>
                        <p class="card-text font-weight-bold">Extra Information:</p>
                        <p class="card-text">
                            <span class="badge badge-pill badge-success">
                                    ${cocktail.strAlcoholic}
                            </span>
                            <span class="badge badge-pill badge-warning">
                                    Category: ${cocktail.strCategory}
                            </span>
                        </p>
                    </div>
                </div>
        </div>
            `;
        });
        this.isFavorite();
    }

    printCocktailsWithoutIngredient(cocktails) {
        // Show the Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert the results
        const resultsDiv = document.querySelector('#results');

        // Loop trought drinks
        cocktails.forEach(cocktail => {
             resultsDiv.innerHTML += `
                  <div class="col-md-4">
                       <div class="card my-3">
                            <button type="button" data-id="${cocktail.idDrink}" class="favorite-btn btn btn-outline-info">
                            +
                            </button>
                            <img class="card-img-top" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                            <div class="card-body">
                                 <h2 class="card-title text-center">${cocktail.strDrink}</h2>
                                 <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${cocktail.idDrink}">Get Recipe</a>
                            </div>
                       </div>
                  </div>
             `;
        });
        this.isFavorite();
    }

    printIngredients(cocktail) {
        let ingredients = [];
        for(let i = 1; i< 16; i++) {
            const ingredientMeasure = {};
            if (cocktail[`strIngredient${i}`] !== "") {
                ingredientMeasure.ingredient = cocktail[`strIngredient${i}`];
                ingredientMeasure.measure = cocktail[`strMeasure${i}`]
                ingredients.push(ingredientMeasure);
            }
        }

        let ingredientsTemplate = "";
        ingredients.forEach(ingredient => {
            ingredientsTemplate +=
                `
                <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
                `;
        });

        return ingredientsTemplate;
    }

    printRecipe(recipe) {
        const modalTitle = document.querySelector('.modal-title'),
        modalDescription = document.querySelector('.modal-body .description-text'),
        modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');
        
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;

        modalIngredients.innerHTML = this.printIngredients(recipe);
    }

    printCategories(categories) {
        const select = document.querySelector(".search-category");
        categories.forEach(category => {
            const option = document.createElement("option");
            option.textContent = category.strCategory;
            category.strCategory.split(" ").join("_");
            select.appendChild(option);
        })
    }

    printFavorites(favorites) {
        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(cocktail => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                        <img src="${cocktail.image}" alt="${cocktail.name}" width=100>
                </td>
                <td>${cocktail.name}</td>
                <td>
                        <a href="#" data-toggle="modal" data-target="#recipe" data-id="${cocktail.id}" class="btn btn-success get-recipe" >
                            View
                        </a>
                </td>
                <td>
                        <a href="#" data-id="${cocktail.id}" class="btn btn-danger remove-recipe" >
                            Remove
                        </a>
                </td>
            `;

            favoritesTable.appendChild(tr)});
    }

    removeFavorite(element){
        element.remove();
    }

    printMessage(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-dismissible alert-${className}`
        div.innerHTML = 
        `
            <button type="button" class="close" data-dismiss="alert">X</button>${message}
        `;
        const reference = document.querySelector(".jumbotron h1");
        reference.parentElement.insertBefore(div, reference);
        setTimeout(() => div.remove(), 3000)
    }

    clearResults() {
        const results = document.getElementById("results");
        results.innerHTML = "";
    }

    isFavorite() {
        const cocktails = cocktailDB.getFromDB();
        cocktails.forEach(cocktail => {
            let {id} = cocktail;
            const favoriteCocktail = document.querySelector(`[data-id="${id}"]`);
            if(favoriteCocktail) {
                favoriteCocktail.classList.add("is-favorite");
                favoriteCocktail.textContent = "-";
            }
        })
    }
}