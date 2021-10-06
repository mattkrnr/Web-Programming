const mean = function mean(array)
{
    if(!Array.isArray(array))
        throw 'Input must be an array';
    if(array === [])
        throw 'Array cannot be empty.';
    sum = 0;
    for(i=0;i<array.length;i++)
    {
        if(typeof(array[i]) !== "number")
            throw 'Input must be an array of numbers.';
        sum = sum + array[i];
    }
    return sum/array.length;
}

const medianSquared = function medianSquared(array)
{
    if(!Array.isArray(array))
        throw 'Input must be an array';
    if(array === [])
        throw 'Array cannot be empty.';
    for(i=0; i<array.length; i++)
    {
        if(typeof(array[i]) !== "number")
            throw 'Input must be an array of numbers.';
    }
    array.sort();
    if(array.length%2!==0)
        return Math.pow(array[(array.length-1)/2],2);
    avgOfMiddles = (array[array.length/2] + array[(array.length-2)/2]) / 2;
    return Math.pow(avgOfMiddles),2;
    
}

const maxElement = function maxElement(array)
{
    if(!Array.isArray(array))
        throw 'Input must be an array';
    if(array === [])
        throw 'Array cannot be empty.';
    for(i=0; i<array.length; i++)
    {
        if(typeof(array[i]) !== "number")
            throw 'Input must be an array of numbers.';
    }
    array.sort();
    
    return array[array.length-1];
}

const fill = function fill(end,value=undefined)
{
    if(typeof(end) !== "number")
        throw 'End input must be a number';
    if(end <= 0)
        throw 'End value must be greater than zero';
    useValue = (value !== undefined);
    array = [];
    for(i = 0; i < end; i++)
    {
        if(useValue)
            array.push(value);
        else
            array.push(i);
    }
    return array;
}

const countRepeating = function countRepeating(array)
{
    if(!Array.isArray(array))
        throw 'Input must be an array';
    if(array === [])
        return {};
    object = {};
    for(i=0; i<array.length; i++)
    {
        if(typeof(array[i]) !== "number" && typeof(array[i]) !== "string")
            throw 'Input must be an array of numbers.';
        
        if(object[array[i]] >= 1)
            object[array[i]] = object[array[i]] + 1;
        else
            object[array[i]] = 1;
    }
    
    for(var key in object)
    {
        if(object[key] < 2)
            delete object[key];
    }
    return object;
}

const isEqual = function isEqual(arrayOne,arrayTwo)
{
    if(arrayOne === undefined || arrayTwo === undefined)
        throw 'isEqual requires two arrays as inputs';
    if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo))
        throw 'Both inputs must be an array';

    if(arrayOne.length !== arrayTwo.length)
        return false;

    arrayOne.sort();
    arrayTwo.sort();
    for(i = 0; i<arrayOne.length; i++)
    {
        hasValue = false;
        if(typeof(arrayOne[i]) !== typeof(arrayTwo[i]))
        { 
            return false;
        }
        

        if(Array.isArray(arrayOne[i]))
        {
            arrayOne[i].sort();
            arrayTwo[i].sort();
            for(j = 0; j<arrayOne[i].length; j++)
            {
                hasValue = (arrayOne[i][j] === arrayTwo[i][j]);
                if (!hasValue)
                    return false;
            }
            hasValue = true;
        }
        else
        {
            if(arrayOne[i] === arrayTwo[i])
                 hasValue=true;
        }
        if(!hasValue)
        {
            return false;
        }
    }
    return true;
}


module.exports = 
{
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}