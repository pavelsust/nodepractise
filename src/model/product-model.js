
const mongoose = require('mongoose')
const Joi = require('joi')

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    inStock: Number
})

function validateProductSchema(product){
    let schema = Joi.object({
        title: Joi.string().min(3).max(256).required(),
        price: Joi.number().min(0).max(100000),
        inStock: Joi.number().min(0).max(1000)
    })
    return schema.validate(product)
}


let Product = mongoose.model("product" , productSchema)

module.exports.validateProductSchema = validateProductSchema
module.exports.Product = Product