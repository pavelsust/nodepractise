
const express = require('express')
const morgan = require("morgan")
const config = require("config")
const app = express()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
app.use(express.json())
app.use(express.urlencoded({extended : true}))


require('./db/db')()


const mainRoute = require('./routes/routes')

const startUpDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
app.use(morgan("tiny"))

console.log(`App ${config.get('name')}`)
startUpDebugger("Morgan enabled.... ")

mainRoute.route(app)

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

