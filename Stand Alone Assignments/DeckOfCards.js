function Player(name) {
    this.name = name;
    this.hand = [];
    


    this.discard = function(card,deck)
    {
        deck.cards.push(this.hand[card]);
        this.hand.splice(card,1)
    }
}

function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

function Deck() {

    this.create = function () //creates deck of cards
    {
        this.cards = ["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","h11","h12","h13",
                       "s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13",
                       "c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13",
                       "d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","d11","d12","d13"];
        this.deckCards = this.cards.slice[0];

    }

    this.shuffle = function(array)
    {
        for (var i = this.cards.length-1; i>=0; i--)  // for loop i starts at length of cards left minus 1 and decrements until equal to zero
        {
            var randomidx = Math.floor(Math.random() * (i+1));  //randomidx is set to random number of 0-1 times length deck plus 1
            var thiscard= this.cards[randomidx];        //thiscard equal to index spot from above. for example this.cards[3] is h4.
            this.cards[randomidx] = this.cards[i];      //the random index from above is set to be this.cards[i]. eg h4 is set to be h1
            this.cards[i] = thiscard                    //this.cards[i] swaps with randomidx. h1 becomes h4.
        }
        return this.cards;
    }

    this.deal = function(num, player)
    {
        let dealt = [];
        for (var i = 1; i <= num; i++)
        {
            var ranIdx = Math.floor(Math.random() *this.cards.length);
            dealt.push(this.cards[ranIdx]);
            this.cards.splice(ranIdx, 1); //splice removes 1 element at randIdx
        }

        if (player != null)
        {
            player.hand=player.hand.concat(deal);
        }
        return dealt;
    }
    
}

bicycle = new Deck();
bicycle.create();
console.log(bicycle)

jon = new Player("jon")
console.log("jon")
jon.draw()

