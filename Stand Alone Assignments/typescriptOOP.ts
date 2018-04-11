

class Bike{
    constructor(public price: number, public maxSpeed: number, public miles?: number)
    {
        this.miles=0;
    }

    displayInfo = () => {
        console.log(this.price, this.maxSpeed, this.miles);
        return this;
    }

    ride = () => {
        this.miles+=10;
        console.log("Riding...10 miles added to bike", this.miles, " miles ridden on this bike")
        return this;
    }

    reverse = () =>  {
        if(this.miles >= 5)
        {

            this.miles-= 5;
            console.log("Reversing ", this.miles, " miles ridden on bike")
            return this;
        }
        else
        {
            console.log("Cannot go into negative mileage.")
            return this;
        }
    }
}

var bike1 = new Bike(100,50)
var bike2 = new Bike(400, 25)
var bike3 = new Bike(200,40)


bike1.ride().ride().ride().reverse().displayInfo()

bike2.ride().ride().reverse().reverse().displayInfo()

bike3.reverse().reverse().reverse()