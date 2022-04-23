

const mongoose = require('mongoose')
const Joi = require('joi')

const addressSchema = new mongoose.Schema({
    address:String
})


const Address = mongoose.model('address' , addressSchema)

function validateAddress(address){
   const schema = Joi.object({
       address: Joi.string().min(3).max(256).required()
   })
    return schema.validate(address)
}

module.exports.Address =  Address
module.exports.validateAddress = validateAddress
module.exports.addressSchema = addressSchema


