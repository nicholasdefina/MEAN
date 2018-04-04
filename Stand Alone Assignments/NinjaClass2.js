function Ninja(name)
{
    this.speed = 3;
    this.strength = 3;
    this.health = 100;
    this.name = name;

    this.sayName = function(){
        console.log(this.name)
    }

    this.showStats = function()
    {
        console.log(this.strength);
        console.log(this.speed);
        console.log(this.health);
    }

    this.drinkSake = function()
    {
        this.health+=10;
        console.log("10 health points added. Health is now at " + this.health)
    }

    this.punch = function(ninja)
    {
        if (ninja instanceof Ninja)
        {
            ninja.health -=5;
            console.log(ninja.name + " was punched by" + this.name + " and lost 5 health. Health now at " +ninja.health)
        }
    }

    this.kick = function(ninja)
    {
        if (ninja instanceof Ninja)
        {
            ninja.health -=this.strength*15;
            console.log(ninja.name + " was kicked by" + this.name + " and lost " + this.strength*15 + " health. Health now at " +ninja.health)
        }
    }
}

Osaka = new Ninja ("Osaka")

Daryl = new Ninja ("Daryl")

console.log(Osaka)

Osaka.drinkSake()

Osaka.showStats()

Osaka.sayName()

Osaka.punch(Daryl)

Osaka.kick(Daryl)
