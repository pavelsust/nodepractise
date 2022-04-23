
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


function validateStudentAddressAd(address){
    let schema = Joi.object({
        addressId: Joi.objectId().required(),
    })
    return schema.validate(address)
}



module.exports.validateStudentAddressAd = validateStudentAddressAd