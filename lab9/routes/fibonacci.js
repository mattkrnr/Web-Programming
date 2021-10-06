const express = require('express');
const router = express.Router();

router.get('/',async (req,res) => {
    try {
        res.render('forms/fibonacci',{});
    } catch(e) {
        res.status(404);
        res.render('forms/fibonacci',{ error: e });
    }
});

module.exports = router;