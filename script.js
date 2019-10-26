let app = new Vue({
    el: '#app',
    data: {
        cards: [],
        loading: 2,
        colorFilters: [],
        typeFilters: [],
        rarityFilters: [],
        colors: [
            "White",
            "Green",
            "Red",
            "Black",
            "Blue"
        ],
        cardTypes: [
            "Creature",
            "Instant",
            "Sorcery",
            "Enchantment",
            "Planeswalker",
            "Artifact",
            "Land"
        ],
        rarities: [
            "Common",
            "Uncommon",
            "Rare",
            "Mythic Rare",
            "Special",
            "Basic Land"
        ],
        expanded: false
    },
    created() {
        // this.getCards();
    },
    methods: {
        async getCards() {
            try {
                let url = 'https://api.magicthegathering.io/v1/cards?';
                if (this.colorFilters.length > 0) {
                    if (url.charAt(url.length - 1) != '?') {
                        url += '&'
                    }
                    url += 'colors=' + this.colorFilters.join('|').toLowerCase();
                }
                if (this.typeFilters.length > 0) {
                    if (url.charAt(url.length - 1) != '?') {
                        url += '&'
                    }
                    url += 'types=' + this.typeFilters.join('|').toLowerCase();
                }
                if (this.rarityFilters.length > 0) {
                    if (url.charAt(url.length - 1) != '?') {
                        url += '&'
                    }
                    url += 'rarities=' + this.rarityFilters.join('|').toLowerCase();
                }
                this.loading = 1;
                const response = await axios.get(url);
                this.cards = response.data.cards
                console.log(this.cards)
                this.loading = 0;
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
        },
        toggleTypeFilter(type) {
            if (this.typeFilters.includes(type)) {
                this.typeFilters.splice(this.typeFilters.indexOf(type), 1);
            } else {
                this.typeFilters.push(type);
            }
        },
        toggleRarityFilter(r) {
            if (this.rarityFilters.includes(r)) {
                this.rarityFilters.splice(this.rarityFilters.indexOf(r), 1);
            } else {
                this.rarityFilters.push(r);
            }
        },
        getColorSVG(c) {
            return "./images/svgs/" + c + ".svg";
        },
        toggleFilters() {
            var f = document.getElementById("filters");

            if (f.style.display === "block") {
                f.style.display = "none";
            } else {
                f.style.display = "block";
            }

            this.expanded = !this.expanded;
        }
    }
})