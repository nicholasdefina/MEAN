function zero_negativity(arr)
{
    for(var i = 0; i<arr.length; i++)
    {
        if(arr[i] < 0)
        {
            return false;
        }
    }
    return true;
}


function is_even(num)
{
    if (num % 2 == 0)
    {
        return true;
    }

    else 
    {
        return false;
    }

}

function how_many_even(array)
{
    var count = 0;
    for (var h = 0; h< array.length; h++)
    {
        if (array[h] % 2 == 0)
        {
            count+=1;
        }
    }
    return count;
}


function create_dummy_array(n)
{
    var newArray=[];
    for (var z = 0; z<n; z++)
    {
      random = Math.floor(Math.random() * 10);
      newArray.push(random);  
    }
    return newArray;
}


function random_choice(thisarray)  //[2,4,8]
{
    if (thisarray.length == 0)
    {
        console.log("Array has no length")
    }
    else
    {
        randIdx = Math.floor(Math.random() * thisarray.length)
        return thisarray[randIdx];
    }
}