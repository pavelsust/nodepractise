
const productRoute = require('express').Router()
const {validateProductSchema, Product} = require('../model/product-model')

productRoute.post('/product/add' , async (request , response)=>{
    let {error} = validateProductSchema(request.body)
    if (error) return response.status(401).send({error: JSON.stringify(error.message)})

    let result = await Product(request.body).save()
        .then(result => {
            response.send(result)
        })
        .catch(error => response.send(error))
})


productRoute.put('/product/update/:id' , async (request , response)=>{
    let result = Product.findByIdAndUpdate(request.params.id ,{
        $inc:{
            inStock: -80
        }
    }, {new:true})
        .then(result => response.send(JSON.stringify(result)))
        .catch(error => response.send(error))
})


module.exports = productRoute