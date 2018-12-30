const form = document.getElementById("email-form");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", appInit)

    email.addEventListener("blur", validateField);
    subject.addEventListener("blur", validateField);
    message.addEventListener("blur", validateField);

    form.addEventListener("submit", submitForm);
    resetBtn.addEventListener("click", resetForm);
}

function appInit() {
    sendBtn.disabled = true;
}

function validateField() {
    let errors;

    validateLength(this);
    
    if(this.type === "email") {
        validateEmail(this);
    }

    errors = document.querySelectorAll(".error");

    if(email.value !== "" && subject.value !== "" && message.value !== "" && errors.length == 0) {
        sendBtn.disabled = false;
    }
    else {
        sendBtn.disabled = true;    
    }
}

function validateLength(field) {
    if(field.value.length > 0) {
        field.style.borderBottomColor = "green";
        field.classList.remove("error");
    }
    else {
        field.style.borderBottomColor = "red";
        field.classList.add("error");
    }
}

function validateEmail(field) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(field.value)) {
        field.style.borderBottomColor = "green";
        field.classList.remove("error");
    }
    else {
        field.style.borderBottomColor = "red";
        field.classList.add("error");
    }
}

function submitForm(event) {
    const loaders = document.getElementById("loaders");

    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    const sendEmailImg = document.createElement("img");
    sendEmailImg.id = "mailImg";
    sendEmailImg.src = "img/mail.gif";
    sendEmailImg.style.display = "block";
    sendEmailImg.width = 150;

    setTimeout(function() {
        spinner.style.display = "none";
        loaders.appendChild(sendEmailImg);

        setTimeout(function() {
            loaders.removeChild(sendEmailImg);
            form.reset();
        }, 3000);
    }, 2000);

    event.preventDefault();
}

function resetForm(event) {
    if(confirm("Are you sure ? You will lost all your data.")) {
        form.reset();
        sendBtn.disabled = true;
    }
    event.preventDefault();
}