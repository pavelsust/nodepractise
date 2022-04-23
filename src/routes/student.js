
const studentRoute = require('express').Router()
const {Student, studentValidation, studentAddressValidate} = require('../model/student-model')
const {Address, validateAddress} = require('../model/address-model')
const {request, response, json} = require("express");

studentRoute.get('/all' , async (request , response)=>{
    let result = Student.find().populate("address")
        .then(result => response.send(JSON.stringify(result)))
        .catch(error => response.status(500).send(JSON.stringify({error: error.toString()})))
})


studentRoute.get('/:id' , async (request , response)=>{
    let result = await Student.findById({'_id': request.params.id}, {'_id':0 , '__v':0})
        .populate("address")
        .then(result=> response.send(JSON.stringify(result)))
        .catch (error => response.status(402).send(JSON.stringify({error: error})))
})


studentRoute.post('/add', async (request , response)=>{

     let {error} = studentValidation(request.body)
     if (error) return response.status(402).send(JSON.stringify({error: error.message}))

    let result = new Student({
        name: request.body.name,
        classNumber: request.body.classNumber,
        address: request.body.address
    })

    let finalResult = await result.save()
    return response.send(finalResult)
})

studentRoute.post('/create/address' , async (request , response)=>{
    let {error} = validateAddress(request.body)
    if (error) return response.status(402).send(JSON.stringify({error: error}))

    let address = new Address({
        address: request.body.address
    })

    let result = address.save().then(result => response.send(JSON.stringify(result)))
        .catch(error => response.status(402).send(JSON.stringify(error)))
})


studentRoute.post('/add/address' , async (request , response)=>{
    let {error} = studentAddressValidate(request.body)
    if (error) return response.status(403).send(JSON.stringify({error: error}))

    let result = await Student.findById({'_id': request.body.studentId})
        .then(result=>{
            if (result==null) response.status(404).send(JSON.stringify({student: "Not Found"}))
            if (result.address.includes(request.body.addressId)) return response.status(500).send(JSON.stringify({error:"Already Have"}))
            result.address.push(request.body.addressId)
            result.save()
            response.send(JSON.stringify(result))
        }).catch(error=> response.status(401).send({error: error}))
})

studentRoute.delete('/remove/address', async (request , response)=>{
    let {error} = studentAddressValidate(request.body)
    if (error) return response.status(401).send(JSON.stringify({error: error}))

    let result = await Student.findById(request.body.studentId)
        .then(result=>{
            if (result==null) return response.status(500).send(JSON.stringify("Not Found"))
            if (!result.address.includes(request.body.addressId)) return response.status(500).send(JSON.stringify({error: "Item Not Found"}))
            result.address.remove(request.body.addressId)
            result.save()
            response.send(JSON.stringify(result))
        })
})

module.exports = studentRoute