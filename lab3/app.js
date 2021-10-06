const people = require("./people");
const work = require("./work");
const axios = require('axios');

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{ //GetPersonById
        const persondata = await people.getPersonById(43);
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const persondata = await people.getPersonById(-1);
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const persondata = await people.getPersonById(1001);
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const persondata = await people.getPersonById();
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    
    try{ //HowManyPerState
        const count = await people.howManyPerState("NY");
        console.log(count);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const count = await people.howManyPerState("WY");
        console.log(count);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const count = await people.howManyPerState();
        console.log(count);
    } catch (e) {
    console.error(e);
    }

    try{ //personByAge
        const persondata = await people.personByAge(999);
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const persondata = await people.personByAge(1000);
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ 
        const persondata = await people.personByAge();
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ //peopleMetrics
        const persondata = await people.peopleMetrics();
        console.log(persondata);
    } catch (e) {
    console.error(e);
    }
    try{ //listEmployees
        const companyData = await work.listEmployees();
        console.log(companyData);
    } catch (e) {
    console.error(e);
    }
    try{ //fourOneOne
        const companyData = await work.fourOneOne();
        console.log(companyData);
    } catch (e) {
    console.error(e);
    }
    try{ //fourOneOne
        const companyData = await work.fourOneOne('240-144-7553');
        console.log(companyData);
    } catch (e) {
    console.error(e);
    }
    try{ //fourOneOne
        const companyData = await work.fourOneOne('504-500-478');
        console.log(companyData);
    } catch (e) {
    console.error(e);
    }

    try{ //whereDoTheyWork
        const data = await work.whereDoTheyWork('264-67-0084');
        console.log(data);
    } catch (e) {
    console.error(e);
    }
    try{ //whereDoTheyWork
        const data = await work.whereDoTheyWork('123456789');
        console.log(data);
    } catch (e) {
    console.error(e);
    }
    try{ //whereDoTheyWork
        const data = await work.whereDoTheyWork('277-85-0056');
        console.log(data);
    } catch (e) {
    console.error(e);
    }
}

//call main
main();
