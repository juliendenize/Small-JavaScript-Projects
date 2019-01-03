import { API }  from './api.js';
import * as UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // read data
    const artist = document.querySelector('#artist').value,
        song = document.querySelector('#song').value;

    if(artist === '' || song === '') {
        UI.messageDiv.innerHTML = 'Please fill all the inputs';
        UI.messageDiv.classList.add('error');

        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');     
        }, 3000);

    } else {
        const api = new API(artist, song);
        api.queryAPI()
            .then(lyrics => {
               if(lyrics) {
                    UI.resultDiv.textContent = lyrics;
               } else {
                    UI.messageDiv.innerHTML = 'No Lyrics Found';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');     
                    }, 3000);
               }
            })
    }
} )
