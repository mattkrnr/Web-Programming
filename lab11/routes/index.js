const shows = require('./shows');

const constructorMethod = app => {
    app.use("/",shows);

    app.use("*",(req,res) => {
        res.status(404).json({error: "Not found"});
    });
}

module.exports = constructorMethod;