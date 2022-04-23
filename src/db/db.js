
const mongoose = require('mongoose')
mongoose.pluralize(null);

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidlyTest')
        .then(()=> {
            console.info('Connected to MongoDB...')
        })
        .catch(error => console.error('Database is not connected '+error))

}

