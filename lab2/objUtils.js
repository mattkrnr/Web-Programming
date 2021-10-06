const arrayUtils = require("./arrayUtils");

const makeArrays = function makeArrays(objects)
{
    if(!Array.isArray(objects))
        throw 'Array is required'
    for(i = 0; i < objects.length; i++)
    {
        if(typeof(objects[i]) !== 'object')
            throw 'Array of objects is required'
        if(Object.entries(objects[i]).length === 0)
            throw 'Objects cannot be empty'
    }
    if(objects.length < 2)
        throw 'There must be at least 2 objects'

    keyValuePairs = [];
    for(i = 0; i < objects.length; i++)
    {
        keyValuePairs = keyValuePairs.concat(Object.entries(objects[i]));
    }
    return keyValuePairs;
}

const isDeepEqual = function isDeepEqual(obj1,obj2)
{
    if(typeof(obj1) !== 'object' || typeof(obj2) !== 'object')
            throw 'Two object inputs are required';
    
    obj1Keys = Object.keys(obj1);
    obj2Keys = Object.keys(obj2);

    obj1Keys.sort();
    obj2Keys.sort();
    for(i = 0; i < obj1Keys.length; i++)
    {
        hasSameValue = false;
        if(typeof(obj1[obj1Keys[i]]) === "object")
        {
            obj1InnerKeys = Object.keys(obj1[obj1Keys[i]]);
            obj2InnerKeys = Object.keys(obj2[obj2Keys[i]]);

            obj1InnerKeys.sort();
            obj2InnerKeys.sort();
            for(j = 0; j < obj1InnerKeys.length; j++)
            {
                if(obj1InnerKeys[j] !== obj2InnerKeys[j])
                    return false;
                else 
                    hasSameValue = true;
            }
        }
        else if(obj1[obj1Keys[i]] !== obj2[obj2Keys[i]])
            return false;
        else
            hasSameValue = true;


    }
    return true;
}

const computeObject = function computeObject(object,func)
{
    if(typeof(object) !== "object")
        throw 'object must be of type object';
    if(typeof(func) !== 'function' )
        throw 'func must be of type function';

    for(let key in object)
    {
        object[key] = func(object[key]);
    }
    return object;

}

module.exports = {

    makeArrays,
    isDeepEqual,
    computeObject
}