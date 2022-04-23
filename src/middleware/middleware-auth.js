
const jwt = require('jsonwebtoken')

function auth (request , response , next){
    let bearerHeader = request.header('authorization')
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    if (!token) return response.status(401).send('Access denied')
    try {
        let decoded = jwt.verify(token,"secret_token")
        request.user = decoded
        next()
    }catch (error){
        response.status(400).send('Invalid token')
    }
}

module.exports = auth