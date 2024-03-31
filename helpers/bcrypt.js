const brypt = require('bcryptjs')

const hashPassword = (password) => brypt.hashSync(password,5)
const comparePassword = (password,hash) => brypt.compareSync(password,hash)

module.exports={hashPassword,comparePassword}