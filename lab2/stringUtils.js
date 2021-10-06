const camelCase = function camelCase(string)
{
    string = string.trim();
    if(string === undefined)
        throw 'String input required';
    if(string.length === 0)
        throw 'Cannot send empty string';
    if(typeof(string) !== "string")
        throw 'Input must be of type string';
    
    string = string.toLowerCase();

    array = string.split(' ');

    outputString = "";
    for(i=0; i < array.length; i++)
    {
        if(i === 0)
            outputString = outputString + array[i];
        else
            outputString = outputString + array[i][0].toUpperCase() + array[i].substr(1,array[i].length-1);
    }
    return outputString;
}

const replaceChar = function replaceChar(string)
{

    string = string.trim();
    if(string === undefined)
        throw 'String input required';
    if(string.length === 0)
        throw 'Cannot send empty string';
    if(typeof(string) !== "string")
        throw 'Input must be of type string';

    startingChar = string[0];
    useDollarSign = false;
    string = string.substr(1,string.length-1);
    for(i = 0; i < string.length; i++)
    {
        if(string[i].toLowerCase() === startingChar.toLowerCase())
        {
            if(useDollarSign)
            {
                string = string.replace(string[i],'$');
                useDollarSign = false;
            }
            else
            {
                string = string.replace(string[i],'*');
                useDollarSign = true;
            }
        }
    }
    return startingChar + string;
}

const mashUp = function mashUp(string1,string2)
{
    string1 = string1.trim();
    string2 = string2.trim();

    if(string1 === undefined || string2 === undefined)
        throw 'String input required';
    if(string1.length < 2 || string2.length < 2)
        throw 'Strings must have a length of at least 2';
    if(typeof(string1) !== "string" || typeof(string2) !== "string")
        throw 'Input must be of type string';

    firstTwo = string1.substr(0,2);
    secondTwo = string2.substr(0,2);

    return secondTwo + string1.substr(2,string1.length) + " " + firstTwo + string2.substr(2,string2.length);
}

module.exports = {

    camelCase,
    replaceChar,
    mashUp
}