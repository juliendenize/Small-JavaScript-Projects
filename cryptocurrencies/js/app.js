const cryptoAPI = new CryptoAPI();
const ui = new Ui();

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currency = document.getElementById("currency").value;
    const cryptocurrency = document.getElementById("cryptocurrency").value;

    if(currency !== "" && cryptocurrency !== "") {
        cryptoAPI.queryAPI(currency, cryptocurrency)
                 .then(data => {
                    ui.displayResult(data[0], currency);
                 })
                 .catch(() => ui.printMessages("Sorry, the API used is depreciated so some queries do not work, try another cryptocurrency.", "deep-orange darken-4 card-panel", 5000));
    }
    else {
        ui.printMessages("All fields are mandatory", "deep-orange darken-4 card-panel", 3000);
    }
})