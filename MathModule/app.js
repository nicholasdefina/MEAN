var mathlib = require('./mathlib')();

console.log(mathlib.add(1,4));

console.log(mathlib.multiply(7,5));

console.log(mathlib.square(7));

for (var i = 0; i < 10; i++)
{
    var test = mathlib.random(1,10);
    console.log(test);
}





