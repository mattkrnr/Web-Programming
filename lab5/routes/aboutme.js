const express = require('express');
const router = express.Router();

router.get('/',async (req,res) => {
    try {
        const aboutMeObject =
        {
            "name": "Matt Koerner",
            "cwid": "10439635",
            "biography": "My name is Matt Koerner. I am a Junior at Stevens Institute of Technology studying Computer Science. I am also pursuing a minor in Marketing. I plan to pursue a Master's degree after achieving my Bachelor's degree.\n"+
            "I currently hold a Web Application Developer position. There, I handle the databases of our clients using a platform called OutSystems. I also create user-friendly web screens so the clients can view their data and analytics of their data as well.",
            "favoriteShows": ["Mandalorian", "The Office", "Arrow", "Flash"]
        };
        res.json(aboutMeObject);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;