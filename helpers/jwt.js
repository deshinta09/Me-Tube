const jwt = require('jsonwebtoken')
const secret = process.env.secret
// console.log(secret,'<-secret');

const createToken = (payload) => jwt.sign(payload,secret)
const compareToken = (payload) => jwt.verify(payload,secret)

module.exports={createToken,compareToken}