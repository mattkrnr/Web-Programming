const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => 
{
    try {
        res.render('shows/shows',{});
    } catch (e) {
        res.status(404).json(e);
    }
});

module.exports = router;