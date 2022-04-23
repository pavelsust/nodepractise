
const mongoose = require('mongoose')
const Joi = require('joi')
const {addressSchema} = require('../model/address-model')


let studentSchema = new mongoose.Schema({
    name: String,
    classNumber: Number,
    address: [{type : mongoose.Schema.Types.ObjectId, ref: "address"}]
})


function studentAddressValidate(address){
    let schema = Joi.object({
        studentId: Joi.objectId().required(),
        addressId: Joi.objectId().required(),
    })

    return schema.validate(address)
}

function studentValidation(student){
    const schema = Joi.object({
        name: Joi.string().min(3).max(256).required(),
        classNumber: Joi.number().min(1).max(10).required(),
        address: Joi.objectId()
    })
    return schema.validate(student)
}

const Student = mongoose.model("student", studentSchema)

module.exports.Student = Student
module.exports.studentValidation = studentValidation
module.exports.studentAddressValidate = studentAddressValidate