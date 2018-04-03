function magic_multiply(x,y)
{
    if (x ===0 && y ===0)
    {
        console.log("All inputs 0");
    }

    else if (typeof(x)==='number' && typeof(y)==='number')
    {
        console.log(x*y)
    }


    else if (x instanceof Array && typeof(y) ==='number')
    {
        for (var i = 0; i < x.length; i++)
        {
            console.log(x[i]*y);
        }
    }

    else if (typeof(y)==='string' || y instanceof String)
    {
        console.log("Error: Can not multiply by string")
    }

    else if (x instanceof String || typeof(x)==='string')
    {
        var repeat = "";
        while ( y > 0)
        {
            repeat += x;
            y--
        }
        console.log(repeat);
        
    }

}

let test1 = magic_multiply(5,2);
// console.log(test1);

let test2 = magic_multiply(0,0);
// console.log(test2);

let test3 = magic_multiply([1,2,3], 2);
// console.log(test3);

let test4 = magic_multiply(7, "three");
// console.log(test4);

let test5 = magic_multiply("Brendo", 4);
// console.log(test5);