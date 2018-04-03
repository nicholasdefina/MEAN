function Player(name, hand) {
    this.name = name;
    this.hand = [];
    this.points = 0;

    this.ask = function (card, player) 
    {
        for (var i = 0; i < player.hand.length; i++) 
        {
            if (card == player.hand[i]) 
            {
                this.points += 1;
                console.log("Success")
            }
        }
    }
    this.draw = function (deck)
    {
        var newCard = new Card();
        this.hand.push(newCard)
    }
}

function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

function Deck() {
    this.amount = 52;
    this.cards = [];
    this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"]

    this.deal = function () 
    {
        for (var value = 1; value < 14; value++) 
        {

            for (suit in this.suits) 
            {
                newCard = new Card(suit, value);
                this.cards.push(newCard);
            }
        }
    }
    
}

bicycle = new Deck();
bicycle.deal();

john = new Player("John", [5, 7, 2, 4, 6])
ken = new Player("Ken", [5, 3, 2, 9, 8])



john.ask(5, ken)
console.log(john)



console.log(bicycle)

Math.random()