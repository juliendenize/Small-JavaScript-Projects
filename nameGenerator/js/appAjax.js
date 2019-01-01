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
    if (quantity != "") {
        apiUrl += `amount=${quantity}`;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', apiUrl, true);

    xhr.onload = function() {
        if (this.status === 200) {
            const names = JSON.parse(this.responseText);
            
            let html = '<h2>Generated names</h2>';
            html += '<ul class="list">';
            names.forEach(function(name) {
                // Sometimes there is no name
                if(name.name === "") {
                    name.name = "Object without name";
                }
                
                html += `<li>${name.name}</li>`;
            });
            html += '</ul>';
            document.getElementById("result").innerHTML = html;
        }
    }

    xhr.send();
}