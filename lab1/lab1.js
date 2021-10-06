
/* 
    Input: list of numbers
    Output: Object with number as key and true/false as the value depending on whether the number is prime or not 
*/
const questionOne = function questionOne(arr) {
    if(arr == null || arr.length === 0)
        return {};
    let myObj = {};
    for(let x of arr)
    {
        myObj[x] = isPrime(x);
    }
    return myObj;
}
const isPrime = function isPrime(num) {
    if(num === 1)
        return false;
    for (i = 2; i <= Math.sqrt(num); i++)
    {
        if(num % i === 0)
            return false;
    }
    return true;
}

/* 
    Input: array of numbers
    Output: The square root of (the sum of the squares to the 5th) rounded to two decimal plaes
*/
const questionTwo = function questionTwo(arr) { 
    if(arr.length === 0)
        return 0;
    value = 0;
    for(i = 0; i < arr.length; i++)
    {
        value = value + Math.pow(arr[i],2);
    }
    return roundToTwo(Math.sqrt(Math.pow(value,5)));
}

/*
    Input: String
    Output: object that contains the number of consonants, vowels, numbers, spaces, punctuation, and any special characters in the value str
*/
const questionThree = function questionThree(text) {
    if(text.length === 0)
        return {consonants: 0,  vowels: 0,  numbers: 0, spaces: 0,  punctuation: 0, specialCharacters: 0};

    return{consonants:getConsonantCount(text),vowels:getVowelCount(text),numbers:getNumberCount(text),spaces:getSpaceCount(text),punctuation:getPunctuationCount(text),specialCharacters:getSpecialCharacterCount(text)};

}
const getSpaceCount = function getSpaceCount(text) {
    spaceCount = 0;
    for(let x of text) {
        if(x===" ")
            spaceCount++;
    }
    return spaceCount;
}
const getNumberCount = function getNumberCount(text) {
    numberCount = 0;
    for(let x of text) {
        if(x!==" " && !isNaN(x))
            numberCount++;
    }
    return numberCount;
}
const getPunctuationCount = function getPunctuationCount(text) {
    const PunctuationMarks = '\/.?!,;:-[]{}()"*@\'';
    punctuationCount = 0;
    for(let x of text) {
        if(PunctuationMarks.indexOf(x) !== -1)
            punctuationCount++;
    }
    return punctuationCount;
}
const getSpecialCharacterCount = function getSpecialCharacterCount(text) {
    const SpecialCharacters = '`~#$%^+=><&';
    specialCharacterCount = 0;
    for(let x of text) {
        if(SpecialCharacters.indexOf(x) !== -1)
            specialCharacterCount++;
    } 
    return specialCharacterCount;
}

const getVowelCount = function getVowelCount(text) {
    const Vowels = 'aeiouAEIOU';
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

/*
    Input: Three numbers
    Output: Calculated monthly loan payment given loan amount, interest rate, and number of years
*/
const questionFour = function questionFour(num1,num2,num3) {
    r = num2/1200.0;
    n = num3*12;
    return roundToTwo(num1/ ((Math.pow(1+r,n)-1) / (r*Math.pow(1+r,n))));
}

const roundToTwo = function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = {
    firstName: "Matt", 
    lastName: "Koerner", 
    studentId: "10439635",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};