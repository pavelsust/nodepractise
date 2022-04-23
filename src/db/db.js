
const mongoose = require('mongoose')
mongoose.pluralize(null);
let Fawn = require("fawn");

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidlyTest')
        .then(()=> {
            console.info('Connected to MongoDB...')
            Fawn.init("mongodb://127.0.0.1:27017/vidlyTest");
        })
        .catch(error => console.error('Database is not connected '+error))

}

