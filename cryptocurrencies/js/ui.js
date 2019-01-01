class Ui {
    constructor () {
        this.init();
    }

    init() {
        this.printCryptocurrencies();
    }

    printCryptocurrencies() {
        cryptoAPI.getCryptocurrenciesList()
        .then(cryptocurrenciesList => {
            const selectCryptocurrency = document.getElementById("cryptocurrency");

            cryptocurrenciesList.forEach(cryptocurrency => {
                let option = document.createElement("option");
                option.value = cryptocurrency.name;
                option.textContent = cryptocurrency.name;
                selectCryptocurrency.appendChild(option);
            });
        })
        .catch(error => console.log(`This error happened: ${error}`))
    }

    printMessages(message, className, time) {
        const div = document.createElement("div");
        div.className = className;
        div.textContent = message;
        document.querySelector(".messages").appendChild(div);
        setTimeout(() => div.remove(), time);
    }

    displayResult(data, currency) {
        const result = document.getElementById("result");
        let currencyLower = currency.toLowerCase();
        let html = 
            `
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title">Result</span>
                    <p>The price of ${data.name} is ${data["price_" + currencyLower]} ${currencyLower}<br>
                    Last hour: ${data.percent_change_1h}%<br>
                    Last day: ${data.percent_change_24h}%<br>
                    Last week: ${data.percent_change_7d}%</p>
                </div>
            </div>
            `;

        this.displaySpinner()
        
        setTimeout(() => {
            result.innerHTML = html;
            document.querySelector('.spinner img').remove();
        }, 3000);
    }

    displaySpinner() {
        const spinner = document.createElement("img");
        spinner.src = 'img/spinner.gif';
        document.querySelector(".spinner").appendChild(spinner);
    }
}