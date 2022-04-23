
const mongoose = require('mongoose')
const Joi = require('joi')

let userLoginSchema = new mongoose.Schema({
    email:String,
    password:String
})

let userRegistrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

function validUserRegistration(user){
    let schema = Joi.object(({
        name:Joi.string().min(3).max(256).required(),
        email:Joi.string().email().min(1).max(256).required(),
        password: Joi.string().min(8).max(256).required()
    }))
    return schema.validate(user)
}

function validUserLoginSchema(user){
    let schema = Joi.object(({
        email:Joi.string().email().min(1).max(256).required(),
        password: Joi.string().min(8).max(256).required()
    }))

    return schema.validate(user)
}

let User =  mongoose.model("user", userRegistrationSchema)

module.exports.validUserRegistration = validUserRegistration
module.exports.validUserLoginSchema = validUserLoginSchema
module.exports.User = User
