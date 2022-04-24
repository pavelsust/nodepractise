
const user = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const {validUserRegistration , validUserLoginSchema, User } = require('../model/user-model')
const bcrypt = require('bcrypt')

user.post('/user/registration', async (request , response)=>{
    let {error} = validUserRegistration(request.body)
    if (error) return response.status(401).send(JSON.stringify({error: error.message}))
    let result = await User.findOne({email: request.body.email})
    if (result) return response.status(400).send(JSON.stringify({error: "User Already Registered"}))

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(request.body.password, salt)

    let user = User({
        name: request.body.name,
        email: request.body.email,
        password: hashed
    })
    const token = user.generateAuthToken()
    let userResult = await User(user).save()
        .then(result=> {response.send(JSON.stringify({token:token , result:_.pick(result, ['name', 'email'])}))}).catch(error=> response.send(JSON.stringify({error: error})))
})

user.post('/user/login', async (request, response)=>{
    let {error} = validUserLoginSchema(request.body)
    if (error) return response.status(403).send(JSON.stringify({error: error.message}))

    let user = await User.findOne({email:request.body.email})
    if (!user) return response.status(404).send(JSON.stringify({error: "User Not Found"}))

    let validPassword = await bcrypt.compare(request.body.password, user.password)
    if (!validPassword) return response.status(403).send(JSON.stringify({error:"Wrong Password"}))
    const token = user.generateAuthToken()
    response.send(JSON.stringify({result:_.pick(user,'name', 'email'), token: token}))
})

module.exports = user