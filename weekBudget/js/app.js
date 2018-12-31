// classes

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }

    substractFromBudget(amount) {
        this.budgetLeft -= amount;
        return this.budgetLeft;
    }
}

class HTMLUI {
    constructor() {
        this.budget = document.getElementById("total");
        this.budgetLeft = document.getElementById("left");
    }

    insertBudget(budget) {
        this.budget.textContent = budget;
        this.budgetLeft.textContent = budget;
    }

    displayMessage(message, className) {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("text-center", 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));
        document.querySelector(".primary").insertBefore(messageWrapper, form);
        
        setTimeout(function() {
            messageWrapper.remove();
            form.reset();
        }, 3000);
        
    }

    addExpenseToList(name, amount) {
        const expensesList = document.querySelector('#expenses ul');
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = 
            `
            ${name}
            <span class="badge badge-primary badge-pill">${amount}</span>
            `;
        expensesList.appendChild(li);
    }

    trackBudget(amount) {
        const budgetLeft = budget.substractFromBudget(amount);
        this.budgetLeft.textContent = budgetLeft;

        if(budgetLeft < 0.25 * budget.budget) {
            this.budgetLeft.parentElement.parentElement.classList.remove("alter-success", "alert-warning");
            this.budgetLeft.parentElement.parentElement.classList.add("alert-danger");
        }
        else if (budgetLeft < 0.5 * budget.budget) {
            this.budgetLeft.parentElement.parentElement.classList.remove("alter-success");
            this.budgetLeft.parentElement.parentElement.classList.add("alert-warning");
        }
    }
}

// variables
const form = document.getElementById("add-expense");
const name = document.getElementById("expense");
const expense = document.getElementById("amount");

let budget;
const html = new HTMLUI();


//event Listeners
eventListeners();

function eventListeners() {
    // App init
    document.addEventListener("DOMContentLoaded", function() {
        const userBudget = prompt("What is your budget ?");
        
        if (userBudget === null || userBudget === "" || userBudget === "0") {
            window.location.reload();
        }
        else {
            budget = new Budget(userBudget);
            html.insertBudget(budget.budget);
        }
    })
    
    // Form submitted
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if(expense.value === "" || name.value === "") {
            html.displayMessage("All fields are mandatory", "alert-danger");
        }
        else {
            html.addExpenseToList(name.value, expense.value);
            html.trackBudget(expense.value);
            html.displayMessage("The expense has been added", "alert-success");
        }
    });

}