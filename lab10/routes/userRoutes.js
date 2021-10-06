const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const users = require('./../users');

router.get('/',async(req,res) =>
{
    try {
        if (!req.session.user) {
            res.render('user/login',{hasError:false, error:""});
        } else {
            res.redirect('/private');
        }
    } catch (e) {
        res.status(404);
        res.render('user/error',{message: e})
    }
});

router.post('/login',async(req,res) =>
{
    if(!req.body.username || req.body.username.trim() === "" || !req.body.password || req.body.password.trim() === "")
    {
        res.status(401);
        res.render('user/login',{hasError: true, error: "Invalid username or password"});
    }
    else{
        try {
            let hasMatch = false;
            for(i=0;i<users.length;i++)
            {
                if(users[i].username === req.body.username)
                {  
                    hasMatch = true;
                    let compare = false;
                    try{
                        compare = await bcryptjs.compare(req.body.password,users[i].hashedPassword);
                    } catch(e){
                        //nothing
                    }
                    
                    if(compare)
                    {
                        //set AuthCookie
                        req.session.user = {firstName: users[i].firstName,lastName: users[i].lastName,userId: users[i]._id};
                        res.redirect('/private');
                    }
                    else{
                        res.status(401);
                        res.render('user/login',{hasError: true, error: "Invalid username or password"});
                    }
                }
            }
            if(!hasMatch)
            {
                res.status(401);
                res.render('user/login',{hasError: true, error: "Invalid username or password"});
            }
        } catch (e) {
            //nothing
        }
    }
});

router.get('/logout',async(req,res) =>
{
    req.session.destroy();
    res.send('Logged out. Login here: http://localhost:3000');
});

module.exports = router;