const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id',async (req,res) => {
    try {
        const show = await getShowById(req.params.id);
        show.summary = show.summary.replace(/<.*?>/g, '');
        show.imagename = show.name.replace(/\s/gm,'');
        res.render('shows/single',{show: show});
    } catch(e) {
        res.status(404);
        res.render('general/notfound',{ message: `No Show Found with id '${req.params.id}'` });
    }
});

async function getShowById(id)
{
    if(isNaN(id)) throw new Error("Id must be a number");

    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return data; // this will be the one show object
}

module.exports = router;