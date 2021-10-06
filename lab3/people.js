const axios = require('axios');

async function getPersonById(id)
{
    if(!id)
    {
        throw 'Id is required'
    }
    if(typeof(id) !== "number")
    {
        throw 'Id must be a number'
    }
    
    const parsedData = await getPeople();
    
    for(i=0; i<parsedData.length; i++)
    {
        if(parsedData[i].id === id)
            return parsedData[i];
    }
    
    throw `Person with id ${id} not found`
}

async function howManyPerState(stateAbbrv)
{
    if(!stateAbbrv)
    {
        throw 'stateAbbrv is required'
    }
    if(typeof(stateAbbrv) !== "string")
    {
        throw 'stateAbbrv must be a string'
    }

    personCount = 0;
    const parsedData = await getPeople();

    for(i=0; i<parsedData.length; i++)
    {
        if(parsedData[i].address.state === stateAbbrv)
            personCount++;
    }
    if(personCount === 0)
        throw `There are no people in ${stateAbbrv}`
    return personCount;
}

async function personByAge(index)
{
    if(index !== 0 && !index)
    {
        throw 'Index is required'
    }
    if(typeof(index) !== "number")
    {
        throw 'Index must be a number'
    }

    const parsedData = await getPeople();
    
    if(index < 0 || index >= parsedData.length)
    {
        throw 'Index must be within bounds of array'
    }
    
    parsedData.sort((a,b) => computeAge(b.date_of_birth).comparable - computeAge(a.date_of_birth).comparable);

    return {
        'first_name': parsedData[index].first_name,
        'last_name': parsedData[index].last_name,
        'date_of_birth': parsedData[index].date_of_birth,
        'age': computeAge(parsedData[index].date_of_birth).age
    };
}
const computeAge = function computeAge(birthdate)
{
    today = new Date();
    curryear = today.getFullYear();
    currmonth = today.getMonth()+1;
    currday = today.getDate();

    birthyear = parseInt(birthdate.substr(6,4));
    birthmonth = parseInt(birthdate.substr(0,2));
    birthday = parseInt(birthdate.substr(3,2));

    age = curryear - birthyear - 1;
    if(birthmonth < currmonth || (birthmonth === currmonth && birthday <= currday))
    {
        age++;
    }
    comparable = (curryear-birthyear)*365 + ((12-birthmonth)*30) + (31-birthday);
    return {
        age: age,
        comparable: comparable
    };
}

async function peopleMetrics()
{
    const parsedData = await getPeople();

    totalLetters = 0;
    totalVowels = 0;
    totalConsonants = 0;
    longestName = "";
    shortestName = parsedData[0].first_name + parsedData[0].last_name;
    mostRepeatingCity = "";
    cityObject = {};
    averageAge = 0;
    sumOfAges = 0;
    
    for(i=0; i<parsedData.length; i++)
    {
        firstname = parsedData[i].first_name;
        lastname = parsedData[i].last_name;
        totalLetters = totalLetters + firstname.length + lastname.length;
        totalVowels = totalVowels + getVowelCount(firstname + lastname);
        totalConsonants = totalConsonants + getConsonantCount(firstname + lastname);
        if(firstname.length + lastname.length > longestName.length)
        {
            longestName = `${firstname}${lastname}`;
        }
        if(firstname.length + lastname.length < shortestName.length)
        {
            shortestName = `${firstname}${lastname}`;
        }
        if(cityObject[parsedData[i].address.city] >= 1)
        {
            cityObject[parsedData[i].address.city] = cityObject[parsedData[i].address.city] + 1;
        }
        else 
        {
            cityObject[parsedData[i].address.city] = 1;
        }
        sumOfAges = sumOfAges + computeAge(parsedData[i].date_of_birth).age;
    }
    cities = Object.keys(cityObject);
    max = 0;
    for(i=0;i<cities.length;i++)
    {
        if(cityObject[cities[i]] > max)
        {
            max = cityObject[cities[i]];
            mostRepeatingCity = cities[i];
        }
    }
    averageAge = sumOfAges/parsedData.length;

    return {
        'totalLetters' : totalLetters,
        'totalVowels': totalVowels,
        'totalConsonants': totalConsonants,
        'longestName': longestName,
        'shortestName' : shortestName,
        'mostRepeatingCity': mostRepeatingCity,
        'averageAge': averageAge,
    }
}

const getVowelCount = function getVowelCount(text) {
    const Vowels = "aeiouAEIOU";
    vowelCount = 0;
    for(let x of text) {
        if(Vowels.indexOf(x) !== -1)
        vowelCount++;
    }
    return vowelCount;
}
const getConsonantCount = function getConsonantCount(text){
    const Consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
    consonantCount = 0;
    for(let x of text) {
        if(Consonants.indexOf(x) !== -1)
            consonantCount++;
    }
    return consonantCount;
}

async function getPeople()
{
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    
    return data; // this will be the array of people objects
}

module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics,
    getPeople
}