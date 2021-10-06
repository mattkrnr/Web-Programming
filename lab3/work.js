const people = require("./people");
const axios = require('axios');

async function listEmployees()
{
    const companies = await getCompanies();
    compArr = [];
    
    for(i = 0; i < companies.length; i++)
    {
        index = i;
        compArr.push({company_name:companies[i].company_name});
        employeeArr = [];
        for(j = 0; j < companies[i].employees.length; j++)
        {
            const employeeData = await people.getPersonById(companies[i].employees[j]);
            i = index;
            first_name = employeeData.first_name;
            last_name = employeeData.last_name;
            employeeArr.push({first_name:first_name, last_name:last_name});
        }
        compArr[i].employees = employeeArr;
    }
    return compArr;
}

async function fourOneOne(phoneNumber)
{
    if(!phoneNumber)
        throw 'Phone number is required'
    if(typeof phoneNumber !== "string")
        throw 'Phone number must be a string'
    if(phoneNumber.length < 12 || isNaN(phoneNumber.substr(0,1)) || isNaN(phoneNumber.substr(1,1)) || isNaN(phoneNumber.substr(2,1)) || isNaN(phoneNumber.substr(4,1)) || isNaN(phoneNumber.substr(5,1)) || isNaN(phoneNumber.substr(6,1)) || isNaN(phoneNumber.substr(8,1)) || isNaN(phoneNumber.substr(9,1)) || isNaN(phoneNumber.substr(10,1)) || isNaN(phoneNumber.substr(11,1)) || phoneNumber.substr(3,1) !== '-' || phoneNumber.substr(7,1) !== '-')
        throw 'Phone number is in incorrect format'
    
    const parsedData = await getCompanies();
    
    for(i=0; i<parsedData.length; i++)
    {
        if(parsedData[i].company_phone === phoneNumber)
            return {company_name:parsedData[i].company_name,company_address:parsedData[i].company_address};
    }
        
    throw `Company with phone number ${phoneNumber} not found`
}


async function whereDoTheyWork(ssn)
{
    if(!ssn)
        throw 'ssn is required'
    if(typeof ssn !== "string")
        throw 'ssn must be a string'
    if(ssn.length < 11 || isNaN(ssn.substr(0,1)) || isNaN(ssn.substr(1,1)) || isNaN(ssn.substr(2,1)) || isNaN(ssn.substr(4,1)) || isNaN(ssn.substr(5,1)) || isNaN(ssn.substr(7,1)) || isNaN(ssn.substr(8,1)) || isNaN(ssn.substr(9,1)) || isNaN(ssn.substr(10,1)) || ssn.substr(3,1) !== '-' || ssn.substr(6,1) !== '-')
        throw 'ssn is in incorrect format'

    const parsedData = await people.getPeople();
    for(i=0; i<parsedData.length; i++)
    {
        if(parsedData[i].ssn === ssn)
        {
            fullname = `${parsedData[i].first_name} ${parsedData[i].last_name}`;
            id = parsedData[i].id;
            const companyData = await getCompanies();
            for(j=0;j<companyData.length;j++)
            {
                for(k=0;k<companyData[j].employees.length;k++)
                {
                    if(companyData[j].employees[k] === id)
                        return `${fullname} works at ${companyData[j].company_name}.`;
                }
            }
        }
        
    }
    throw `Person with ssn ${ssn} not found`
}

async function getCompanies()
{
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}