const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',async (req,res) => {
    try {
        const showList = await getShows();
        res.json(showList);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/:id',async (req,res) => {
    try {
        const show = await getShowById(req.params.id);
        res.json(show);
    } catch(e) {
        res.status(404).json({ message: 'Show not found' });
    }
});

async function getShows()
{
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    
    return data; // this will be the array of people objects
}
async function getShowById(id)
{
    if(isNaN(id)) throw new Error("Id must be a number");
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    
    return data; // this will be the array of people objects
}


module.exports = router;