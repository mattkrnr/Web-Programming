const shows = require('./shows');
const search = require('./search');
const form = require('./form');

const constructorMethod = app => {
    app.use("/shows",shows);
    app.use("/search",search);
    app.use("/",form);

    app.use("*",(req,res) => {
        res.status(404).json({error: "Not found"});
    });
}

module.exports = constructorMethod;