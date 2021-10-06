const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',async (req,res) => {
    try {
        res.render('search/form',{});
    } catch(e) {
        res.status(404);
        res.render('general/notfound',{ message: e });
    }
});

module.exports = router;