class CryptoAPI {

    async getCryptocurrenciesList() {
        const response = await fetch("https://api.coinmarketcap.com/v1/ticker/");
        const cryptocurrenciesList = await response.json(); 
        return cryptocurrenciesList;
    }

    async queryAPI(currency, cryptocurrency) {
        const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/${cryptocurrency}/?convert=${currency}`);
        console.log(`https://api.coinmarketcap.com/v1/ticker/${cryptocurrency}/?convert=${currency}`);
        const result = response.json();
        return result;
    }
}