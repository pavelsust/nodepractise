

const mongoose = require('mongoose')
const Joi = require("joi");


let noteSchema = new mongoose.Schema({
    title:String,
    author: String,
    value: Boolean
})


function validateCourse(course){
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        value: Joi.bool().required()
    })
    return schema.validate(course)
}

let Note = mongoose.model("note" , noteSchema)

module.exports.Note = Note
module.exports.validateCourse = validateCourse