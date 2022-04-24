const orderRoute = require('express').Router()
const {validateOrder, Order} = require('../model/order-model')
const {Product} = require('../model/product-model')
const authMiddleWare = require('../middleware/middleware-auth')

orderRoute.post('/order/create',authMiddleWare, async (request , response)=>{

    let orderRequest = {
        userId: request.user._id,
        productId: request.body.productId,
        orderAmount: request.body.orderAmount
    }

    let {error} = validateOrder(orderRequest)
    if (error) return response.status(401).send(JSON.stringify({error: error.message}))

    let order =  Order(orderRequest).save()
    let productUpdate =  Product.findByIdAndUpdate(request.body.productId ,{
        $inc:{
            inStock: -request.body.orderAmount
        }
    }, {new:true})
    
    let result = await Promise.all([order , productUpdate])
        .then(result => response.send(result[0]))
        .catch(error=> response.status(401).send(error))
})

module.exports = orderRoute