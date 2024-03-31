const { ObjectId } = require("mongodb")
const { compareToken } = require("./jwt")

async function authentication(req,db){
    let {authorization} = req.headers
    if(!authorization){
      throw new Error('unauthorized')
    }
    
    let token = authorization.split(' ')[1]
    // console.log(compareToken,'<-authen');
    token = compareToken(token)
    

    let user = await db.collection('users').findOne({_id:new ObjectId(token.id)})
    return user
}

module.exports=authentication