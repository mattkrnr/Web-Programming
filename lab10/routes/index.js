const userRoutes = require('./userRoutes');
const privateRoutes = require('./privateRoutes');

const constructorMethod = app => {
    app.use("/",userRoutes);
    app.use("/private",privateRoutes);

    app.use("*",(req,res) => {
        res.status(404).json({error: "Not found"});
    });
}

module.exports = constructorMethod;