let app = new Vue({
    el: '#app',
    data: {
        cards: [],
        loading: true,
        colorFilters: [],
    },
    created() {
        // this.getCards();
    },
    methods: {
        async getCards() {
            try {
                let url = 'https://api.magicthegathering.io/v1/cards';
                if (this.colorFilters.length > 0) {
                    url += '?colors=' + this.colorFilters.join();
                }
                this.loading = true;
                const response = await axios.get(url);
                this.cards = response.data.cards
                console.log(this.cards);
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        toggleColorFilter(color) {
            if (this.colorFilters.includes(color)) {
                this.colorFilters.splice(this.colorFilters.indexOf(color), 1);
            } else {
                this.colorFilters.push(color);
            }
        }
    }
})