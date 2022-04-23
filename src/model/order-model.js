
const mongoose = require('mongoose')
const Joi = require('joi')

let orderSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    orderAmount: Number
})

function validateOrder(order){
    let schema = Joi.object({
        productId: Joi.objectId().required(),
        orderAmount : Joi.number().required()
    })
    return schema.validate(order)
}


let Order =  mongoose.model("order" , orderSchema)

module.exports.validateOrder = validateOrder
module.exports.Order = Order

