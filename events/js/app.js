const eventbrite = new Eventbrite();
const ui = new Ui();

document.getElementById("submitBtn").addEventListener("click", e => {
    e.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const category = document.getElementById("category").value;
    
    if(eventName !== "" && category !== "") {
        eventbrite.getEvents(eventName, category)
        .then(events => {
            if(events.length > 0) {
                ui.printEvents(events);
            }
            else {
                ui.printMessage("Events not found", "alert alert-danger text-center");
            }})
        .catch((err) => {console.log(err)});
    }
    else {
        ui.printMessage("All fields are mandatory", "alert alert-danger text-center");
    }
});