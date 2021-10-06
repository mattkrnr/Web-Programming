const books = require('./books');
const reviews = require('./reviews');

const constructorMethod = app => {
    app.use("/books",books);
    app.use("/reviews",reviews);

    app.use("*",(req,res) => {
        res.status(404).json({error: "Not found"});
    });
}

module.exports = constructorMethod;