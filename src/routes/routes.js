
const courseRoute = require('./course')
const studentRoute = require('../routes/student')
const productRoute = require('./product')
const orderRoute = require('../routes/order')

function route(app){
    app.use('/api/student', studentRoute)
    app.use('', courseRoute)
    app.use('/api', productRoute)
    app.use('/api', orderRoute)
}

module.exports.route = route