
const courseRoute = require('./course')
const studentRoute = require('../routes/student')
const productRoute = require('./product')
const orderRoute = require('../routes/order')
const userRoute = require('./user')

function route(app){
    app.use('/api/student', studentRoute)
    app.use('', courseRoute)
    app.use('/api', productRoute)
    app.use('/api', orderRoute)
    app.use('/api', userRoute)
}

module.exports.route = route