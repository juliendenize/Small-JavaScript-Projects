class CocktailAPI {
    async getCocktailsByName(searchTerm) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data.drinks ? data.drinks : null;
    }

    async getCocktailsByIngredient(searchTerm) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
        let data;

        // I had to add this code, because when the ingredient doesn't exist, the API don't send anything.
        try{
            data = await response.json();
            data = data.drinks;
        }
        catch {
            data = null;
        }
        finally{
            return data;
        }
    }

    async getCocktailsByCategory(category) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        return data.drinks;
    }

    async getCocktailsByAlcohol(term) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        const data = await response.json();
        return data.drinks;
    }

    async getRecipe(cocktailId) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
        const data = await response.json();
        return data.drinks[0];
    }

    async getCategories() {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        const data = await response.json();
        return data.drinks;
    }
}