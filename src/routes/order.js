const orderRoute = require('express').Router()
const {validateOrder, Order} = require('../model/order-model')
const {Product} = require('../model/product-model')

orderRoute.post('/order/create' , async (request , response)=>{
    let {error} = validateOrder(response.body)
    if (error) return response.status(401).send(JSON.stringify({error: error.message}))
    let order =  Order(request.body).save()

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