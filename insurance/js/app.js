const yearSelect = document.getElementById("year");
const form = document.getElementById("request-quote");
const html = new HTMLUI();

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        html.displayYears();
    });
    form.addEventListener("submit", submitQuote)
}

function submitQuote(event) {
    event.preventDefault();

    const make = document.getElementById("make").value;
    const year = yearSelect.value;
    const level = document.querySelector("input[name='level']:checked").value;

    if(make === "" || year === "" || level === "") {
        html.displayError("Please fill all the fields before submitting.")
    }
    else { // Calculate the insurance
        const prevResult = document.querySelector("#result div");

        if(prevResult !== null) {
            prevResult.remove();
        }

        const insurance = new Insurance(make, year, level);
        const price = insurance.calculatePrice();
        html.displayResults(insurance, price);
    }

}

function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}

Insurance.prototype.calculatePrice = function () {
    let price;
    const base = 2000;

    /*
        1 = american 15%
        2 = asian    05%
        3 = european 35% 
    */
    
    switch(this.make) {
        case '1':
            price = base * 1.15;
        break;
        case '2':
            price = base * 1.05;
        break;
        case '3':
            price = base * 1.35;
        break;
    }

    const differenceYear = new Date().getFullYear() - this.year;

    // Every year is 3% cheaper.
    price -= price * (0.03 * differenceYear);

    /*
       Basic +30%
       Complete +50%
    */
    switch(this.level) {
        case 'basic':
            price *= 1.3;
        break;
        case 'complete':
            price *= 1.5;
        break;
    }

    return price;
}

function HTMLUI() { }

HTMLUI.prototype.displayYears = function () {
    const year = new Date().getFullYear();
    for(let i = year; i >= year - 20; i--) {
        const yearOption = document.createElement("option");
        yearOption.textContent = i;
        yearOption.value = i;
        yearSelect.appendChild(yearOption);
    }
}

HTMLUI.prototype.displayError = function(message) {
    const div = document.createElement("div");
    div.classList = "error";
    div.innerHTML = 
        `
            <p>${message}</p>
        `;
    form.insertBefore(div, document.querySelector(".form-group"));

    setTimeout(function () {
        document.querySelector(".error").remove();
    }, 3000);
}

HTMLUI.prototype.displayResults = function (insurance, price) {
    const result = document.getElementById("result");
    const div = document.createElement("div");
    let make;
    switch(insurance.make) {
        case '1':
            make = "American";
        break;
        case '2':
            make = "Asian";
        break;
        case '3':
            make = "European";
        break;
    }
    div.innerHTML = 
        `
            <p class="header">Summary</p>
            <p class="total">
                Total: $${price}<br>
                Make: ${make}<br>
                Year: ${insurance.year}<br>
                Level: ${insurance.level}
            </p>
        `;

    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";

    setTimeout(function() {
        spinner.style.display = "none";
        result.appendChild(div);
    }, 2000);
    
    
}