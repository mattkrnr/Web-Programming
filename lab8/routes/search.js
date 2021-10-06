const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/',async (req,res) => {
    try {
        if(!req.body.searchTerm || req.body.searchTerm.trim() === "" || typeof(req.body.searchTerm) !== "string") throw new Error("Search term msut be a non-empty string.");
        
        let matches = await getMatchingResults(req.body.searchTerm);
        if(matches.length > 20)
        {
            matches = matches.slice(0,20);
        }
        res.render("search/matches",{matches:matches, searchTerm: req.body.searchTerm});
    } catch(e) {
        res.status(404);
        res.render("general/notfound",{ message: e });
    }
});

async function getMatchingResults(searchTerm)
{
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    if(data.length === 0) throw new Error(`We're sorry, but no results were found for ${searchTerm}`)
    
    return data; // this will be the array of results
}

module.exports = router;