const express = require('express');
const router = express.Router();
const users = require('./../users');

router.get('/',async(req,res) =>
{
    try {
        const user = getUserById(req.session.user.userId);
        res.render('user/details',
            {id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profession: user.profession,
            bio: user.bio});
    } catch (e) {
        res.render('user/error',{message: e});
    }
});

function getUserById(id)
{
    for(i = 0;i < users.length;i++)
    {
        if(id === users[i]._id)
        {
            return users[i];
        }
    }
    throw new Error('You are not associated with a user.');
}

module.exports = router;