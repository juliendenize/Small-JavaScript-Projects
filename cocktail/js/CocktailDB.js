class CocktailDB {
    getFromDB() {
        let cocktails;
        if(localStorage.getItem("cocktails") === null) {
            cocktails = [];
        }
        else {
            cocktails = JSON.parse(localStorage.getItem("cocktails"));
        }
        return cocktails;
    }

    saveIntoDB(cocktail) {
        const cocktails = this.getFromDB();
        cocktails.push(cocktail);
        localStorage.setItem("cocktails", JSON.stringify(cocktails));
    }

    removeFromDB(cocktailId) {
        const cocktails = this.getFromDB();
        cocktails.forEach((cocktail, index) => {
            if(cocktail.id === cocktailId) {
                cocktails.splice(index, 1);
            }
        });
        localStorage.setItem("cocktails", JSON.stringify(cocktails));
    }
}