const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { getdb } = require("../config/mongodb")
const { ObjectId } = require("mongodb")
const { createToken } = require("../helpers/jwt")


class User{
    static async createUser (args){
        const db = await getdb()
        let allUser = await db.collection('users').find({}).toArray()
        let uniqueEmail = allUser.find(el=>el.email===args.email)
        if(uniqueEmail) throw new Error('email must be unique')

        let uniqueUsername = allUser.find(el=>el.username===args.username)
        if(uniqueUsername) throw new Error('username must be unique')

        if(args.password.length < 5) throw new Error('minimal password must be 5 caracther')
        // console.log(args.password.length,'<-jumlah password');
        !args.img && '-'
        
        let newUser= {
            name: args.name,username: args.username,email: args.email,password: hashPassword(args.password), img:args.img
        }
        // console.log(newUser,'<<- args');
        let user = await db.collection('users').insertOne(newUser)
        newUser= {
            _id:user.insertedId,name: args.name,username: args.username,email: args.email, img:args.img
        }
        return newUser
    }
    static async findOne (userLogin){
        const db = await getdb()
        // console.log(userLogin,'<<< id');
        const user = await db.collection('users').findOne({_id:new ObjectId(userLogin._id)})

        return user
    }
    static async login (args){
        const db = await getdb()
        const {email,password} = args
        if(!email || !password) throw new Error('email/password require')
        // console.log(email,password,'<< email psw');
        let user = await db.collection('users').findOne({email})
        // console.log(user,'<-user');
        if(!user) throw new Error('invalid email/password')

        let cekPassword = comparePassword(password,user.password)
        if(!cekPassword) throw new Error('invalid email/password')

        const access_token = createToken({id:user._id})

        return access_token
    }
}

module.exports=User