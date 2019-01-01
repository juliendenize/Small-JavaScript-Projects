document.getElementById("generate-names").addEventListener("submit", loadNames);

function loadNames(e) {
    e.preventDefault();

    const country = document.getElementById("country").value;
    const gender = document.getElementById("genre").value;
    const quantity = document.getElementById("quantity").value;

    let apiUrl = 'https://uinames.com/api/?';

    if (country !== "") {
        apiUrl += `region=${country}&`;
    }

    if (gender !== "") {
        apiUrl += `gender=${gender}&`;
    }
    if (quantity !== "") {
        apiUrl += `amount=${quantity}`;
    }

    fetch(apiUrl)
    .then(response => response.json())
    .then(names => {
        let html = '<h2>Generated names</h2>';
            html += '<ul class="list">';
            names.forEach(name => {
                // Sometimes there is no name
                if(name.name === "") {
                    name.name = "Object without name";
                }
                html += `<li>${name.name}</li>`;
            });
            html += '</ul>';
            document.getElementById("result").innerHTML = html;
    })
    .catch(error => console.log(error));
}