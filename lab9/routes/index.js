const fibonacci = require('./fibonacci');

const constructorMethod = app => {
    app.use("/",fibonacci);

    app.use("*",(req,res) => {
        res.status(404).json({error: "Not found"});
    });
}

module.exports = constructorMethod;