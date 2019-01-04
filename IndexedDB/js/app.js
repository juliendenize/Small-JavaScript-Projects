let DB;

const form = document.querySelector("#form"),
      petName = document.querySelector("#pet-name"),
      ownerName = document.querySelector("#owner-name"),
      phone = document.querySelector("#phone"),
      date = document.querySelector("#date"),
      hour = document.querySelector("#hour"),
      symptoms = document.querySelector("#symptoms"),
      appointments = document.querySelector("#appointments"),
      appointmentTitle = document.querySelector("#appointment-title");

document.addEventListener("DOMContentLoaded", () => {
    let AppointmentDB = window.indexedDB.open("appointments", 1);
    AppointmentDB.onerror = function () {
        console.log("There was an error");
    }
    AppointmentDB.onsuccess = function() {
        DB = AppointmentDB.result;
        displayAppointments();
    }

    // create the database schema
    AppointmentDB.onupgradeneeded = function (e) {
        // the event is the database
        let db = e.target.result;

        // keypath is going to be the indexes
        let objectStore = db.createObjectStore("appointments", { keyPath: "key", autoIncrement: true });

        objectStore.createIndex("petname", "petname", {unique : false});
        objectStore.createIndex("ownername", "ownername", {unique : false});
        objectStore.createIndex("phone", "phone", {unique : false});
        objectStore.createIndex("date", "date", {unique : false});
        objectStore.createIndex("hour", "hour", {unique : false});
        objectStore.createIndex("symptoms", "symptoms", {unique : false});
    }

    form.addEventListener("submit", addAppointment);
})

function addAppointment(e){
    e.preventDefault();
    
    let newAppointment = {
        petname : petName.value,
        ownername : ownerName.value,
        phone : phone.value,
        date : date.value,
        hour : hour.value,
        symptoms : symptoms.value
    };

    let transaction = DB.transaction(['appointments'], "readwrite");
    let objectStore = transaction.objectStore("appointments");

    let request = objectStore.add(newAppointment);
    
    request.onsuccess = () => { form.reset() };
    transaction.oncomplete = () => { displayAppointments(); };
    transaction.onerror = () => {console.log("an error occured")};
}

function displayAppointments () {
    // clear the previous appointments
    while(appointments.firstChild) {
        appointments.removeChild(appointments.firstChild);
    }

    let objectStore = DB.transaction('appointments').objectStore('appointments');

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;
        
        if(cursor) {
            let appointmentHTML = document.createElement("li");
            appointmentHTML.setAttribute("data-appointment-id", cursor.value.key);
            appointmentHTML.classList.add("list-group-item");
            appointmentHTML.innerHTML = 
            `
            <p class="font-weight-bold">Pet name: <span class="font-weight-normal">${cursor.value.petname}</span></p>
            <p class="font-weight-bold">Owner name: <span class="font-weight-normal">${cursor.value.ownername}</span></p>
            <p class="font-weight-bold">Phone : <span class="font-weight-normal">${cursor.value.phone}</span></p>
            <p class="font-weight-bold">Date : <span class="font-weight-normal">${cursor.value.date}</span></p>
            <p class="font-weight-bold">Time : <span class="font-weight-normal">${cursor.value.hour}</span></p>
            <p class="font-weight-bold">Symptoms : <span class="font-weight-normal">${cursor.value.symptoms}</span></p>
            `;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add('btn', 'btn-danger');
            removeBtn.innerHTML = '<span aria-hidden="true">x</span>';
            removeBtn.addEventListener("click", removeAppointment);

            appointmentHTML.appendChild(removeBtn);
            appointments.appendChild(appointmentHTML);
            cursor.continue();
        }
        else {
            if (!appointments.firstChild){
                appointmentTitle.textContent = "Add a new appointment";
                let noAppointment = document.createElement("p");
                noAppointment.textContent = "No results found";
                noAppointment.classList.add("text-center");
                appointments.appendChild(noAppointment);
            } else {
                appointmentTitle.textContent = "Manage your appointments";
            }
        }
    };
}

function removeAppointment(e) {
    e.preventDefault();

    const appointmentKey = Number(e.target.parentElement.getAttribute("data-appointment-id"));

    let transaction = DB.transaction(['appointments'], "readwrite");
    let objectStore = transaction.objectStore("appointments");

    objectStore.delete(appointmentKey);

    transaction.oncomplete = () => { 
        e.target.parentElement.parentElement.removeChild( e.target.parentElement );
        displayAppointments() };
}