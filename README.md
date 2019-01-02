# Small JavaScript Projects

In this repository I store the project I developped via the Udemy course: https://www.udemy.com/modern-javascript-the-complete-course-build-10-projects/ .

### LocalStorageForm
In this project I developped the app.js script, the other resources were given. The idea is to have one webpage where we can add and remove tweets which are displayed as a list.

To add a tweet you click on the add button which doesn't submit the form and store the tweet in the local storage and display it. To remove a tweet you click on the red cross which appear next to the corresponding tweet.

### Shoppingcart
A project similar to the first one. You fill a shopping cart with courses and can remove items or clear the shopping cart. It is also using the local storage.

### Email
A project which consists in validating a form via Javascript. There is a submit button enabled only when all the fields are valids. Also a reset button makes it easy for the user to reset the form.

### Insurance
In this project you fill an insurance form and you get a result based on the data you passed.

There are two scripts that I wrote:
- `js/app.js` which works with old objects with prototypes.
- `js/appClassesES6.js` which works with ES6 classes.

### Budget
In this project a prompt asks for your budget. Then you can add expenses and see how much money you have left.
All the expenses are tracked.

### NamesGenerator
In this project, you can fetch an API which return names. There are 3 parameters: the country, the gender, the amount of names.

There are two scripts:
- `js/appAjax.js` which works with ajax.
- `js/appFetch.js` which works with the Fetch API and arrow functions.

### Cryptocurrencies
Through this project, you can access to the value of different cryptocurrencies using an API.

The API used is depreciated so some queries won't work because you can fetch inexistant data, so try different cryptocurrencies. Sadly, I think at some point nothing will work anymore.

### Events
In this project, you will find events by using keywords. It is using the eventbrite API with a OAuthtoken already configured in this project.

It might not work for you because you might not be using the same configuration as I did and the authentification can fail.

If so follow these steps:
1. **Create an account** on https://eventbrite.com.
2. Go to the **developper section** in your parameters.
3. **Register a new application**. for the url, provide the url you are using locally if you launch a local server.
4. **Copy paste the Oauth token** of your new application in the constructor of `js/eventbrite.js`.
5. Now feel free to **search for events**.