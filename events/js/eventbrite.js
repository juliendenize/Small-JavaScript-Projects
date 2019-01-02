class Eventbrite {
    constructor() {
        this.token_out = "3RIGUJLQWNJYPJEL7WES";
    }

    async getCategoriesList() {
        const response = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token_out}`);
        const data = await response.json();
        return data.categories;
    }

    async getEvents(eventName, category) {
        const response = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=date&categories=${category}&token=${this.token_out}`);
        const data = await response.json();
        return data.events;
    }
}