const tweetList = document.getElementById("tweet-list");
eventListeners()


/**
 * Load the event listeners
 */
function eventListeners() {
    document.getElementById("form").addEventListener('submit', addNewTweet);

    tweetList.addEventListener("click", removeTweet);

    document.addEventListener("DOMContentLoaded", loadTweetsFromLocalStorage);
}

/**
 * Prevent the submission of the form and add the new tweet.
 */
function addNewTweet(event) {
    event.preventDefault();
    const tweetElt = document.getElementById("tweet");
    const tweet = document.getElementById("tweet").value;
    
    if(tweet === "") {
        alert("Please type something before submitting");
    }
    else {
        addTweet(tweet);
        addTweetInLocalStorage(tweet);

        tweetElt.value = "";

        alert("The tweet has been added.");
    }   
}

/**
 * Add tweet (new or from local storage) identified by its value.
 */
function addTweet(tweet) {  
    const removeTweetBtn = document.createElement("a");
    removeTweetBtn.classList = "remove-tweet";
    removeTweetBtn.textContent = "X";
    
    const li = document.createElement("li");
    
    li.textContent = tweet;
    li.appendChild(removeTweetBtn);

    tweetList.appendChild(li);
}

/**
 * Remove the tweet selectionned by the user.
 */
function removeTweet(event) {
    const target = event.target;
    if(target.classList.contains("remove-tweet")) {
        const tweetWithAnX = target.parentElement.textContent; // Contains the tweet and the "X" from the remove anchor.
        const tweet = tweetWithAnX.substring(0, tweetWithAnX.length - 1);
        target.parentElement.remove();
        removeTweetFromLocalStorage(tweet);
        alert("The tweet has been removed.");
    }
}

/**
 * Retrieve all the tweets contained in the local storage.
 */
function getTweetsFromLocalStorage() {
    const localStorageContent = localStorage.getItem("tweets");
    let tweets;
    if(localStorageContent == null) {
        tweets = [];
    }
    else {
        tweets = JSON.parse(localStorageContent);
    }

    return tweets;
}

/**
 * Add the tweet identified by its value in the local storage.
 */
function addTweetInLocalStorage(tweet) {
    let tweets = getTweetsFromLocalStorage();
    tweets.push(tweet);

    localStorage.setItem("tweets", JSON.stringify(tweets));
}

/**
 * When the app is loaded, retrieves all the tweets contained in local storage and displays them.
 */
function loadTweetsFromLocalStorage() {
    const tweets = getTweetsFromLocalStorage();
    tweets.forEach(tweet => {
        addTweet(tweet);
    });
}

/**
 * Remove the tweet identified by its value from the local storage.
 */
function removeTweetFromLocalStorage(tweet) {
    let tweets = getTweetsFromLocalStorage();
    tweets.splice(tweets.indexOf(tweet), 1);
    localStorage.setItem("tweets", JSON.stringify(tweets));
}