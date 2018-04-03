class Ninja
{
    constructor(name)
    {
        this.name = name;
        this.health = 100;
        this.speed = 3;
        this.strength = 3;
    }

     sayName()
    {
        console.log(this.name);
    }

     showStats()
    {
        console.log(this.strength);
        console.log(this.health);
        console.log(this.speed);
        
    }

    drinkSake()
    {
        this.health+=10;
        console.log("10 health points gained. " + this.name + " now has " + this.health + " health.")
    }
}

class Sensei extends Ninja
{
    constructor(name)
    {
        super (name);
        this.health = 200;
        this.speed = 10;
        this.strength = 10;
        this.wisdom = 10;
    }

    speakWisdom()
    {
        super.drinkSake();
        console.log("What one programmer can do in one month, two programmers can do in two months.")
    }
}

const Shredder = new Sensei("Shredder")

Shredder.speakWisdom()

Shredder.showStats()







