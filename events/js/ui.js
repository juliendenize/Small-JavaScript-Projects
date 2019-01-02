class Ui {
    constructor() {
        this.init();
    }

    init() {
        this.printCategories();
    }

    printCategories() {
        eventbrite.getCategoriesList()
        .then(categoriesList => {
            // insert categories in select
            const categorySelect = document.querySelector("#category");
            categoriesList.forEach(category => {
                const categoryOption = document.createElement("option");
                categoryOption.value = category.id;
                categoryOption.textContent = category.name;
                categorySelect.appendChild(categoryOption);
            });
        })
        .catch(error => console.log(error));
    }

    printMessage(message, className) {
        const div = document.createElement("div");
        div.textContent = message;
        div.className = className;
        document.querySelector("#search-events").insertBefore(div, document.querySelector("h1").nextElementSibling);

        setTimeout(() => div.remove(), 3000);
    }

    printEvents(events) {
        const resultDiv = document.getElementById("result");
        let html = "";
        events.forEach(event => {
            html +=
                `
                <div class="col-md-4 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mb-2" src="${event.logo !== null ? event.logo.url : ""}">
                        </div>
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center card-title">${event.name.text}</h2>
                                <p class="lead text-info">Event information:</p>
                                <p>${event.description.text.substring(0,200)}...</p>
                                <span class="badge badge-primary">Date & time: ${event.start.local}</span>
                                <a href="${event.url}" target="_blank" class="btn btn-primary btn-block">Get tickets</a>
                            </div>
                        </div>
                    </div>
                </div>
                            
                `;
        })
        resultDiv.innerHTML = html;
    }
}