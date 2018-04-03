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







//-------------------------------------------------------------------------------------------------------------

// function Ninja(name)
// {
//     const speed = 3;
//     const strength = 3;
//     this.health = 100;
//     this.name = name;

//     this.sayName = function(){
//         console.log(this.name)
//     }

//     this.showStats = function()
//     {
//         console.log(strength);
//         console.log(speed);
//         console.log(this.health);
//     }

//     this.drinkSake = function()
//     {
//         this.health+=10;
//         console.log("10 health points added. Health is now at " + this.health)
//     }

//     this.punch = function(ninja)
//     {
//         if (ninja instanceof Ninja)
//         {
//             ninja.health -=5;
//             console.log(ninja.name + " was punched by" + this.name + " and lost 5 health. Health now at " +ninja.health)
//         }
//     }

//     this.kick = function(ninja)
//     {
//         if (ninja instanceof Ninja)
//         {
//             ninja.health -=15;
//             console.log(ninja.name + " was kicked by" + this.name + " and lost 15 health. Health now at " +ninja.health)
//         }
//     }
// }

// Osaka = new Ninja ("Osaka")

// Daryl = new Ninja ("Daryl")

// console.log(Osaka)

// Osaka.drinkSake()

// Osaka.showStats()

// Osaka.sayName()

// Osaka.punch(Daryl)

// Osaka.kick(Daryl)
