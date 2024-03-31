const User = require("../models/user")

// controllernya
const resolvers = {
    Query: {
        // getUsers: async (_,__,contextValue)=>{
        //     const { db } = contextValue
        //     // get db (Book.findAll())
        //     // console.log(db,'<<< db');
        //     const findUsers = await db.collection('users').find().toArray()
        //     // console.log(findBooks,'<< find book');
        //     return findUsers
        // },
        getUserById: async (_,__,contextValue)=>{
            let userLogin = await contextValue.authentication()
            let user = await User.findOne(userLogin)
            // console.log(user,'<< user');
            user = {
                _id:user._id,username:user.username,name:user.name,email:user.email,img:user.img
            }
            return user
        }
    },
    Mutation: {
        register: async (_,args)=>{
            let user = await User.createUser(args)
            // console.log(user,'<<< user');
            return user
        },
        login: (_,args)=>{
            let access_token = User.login(args)
            // console.log(access_token,'<< token');
            return {access_token}
        },
        search: async (_,args, context)=>{
            const {db} = context
            context.authentication()
            
            let users = await db.collection('users').find({ username:args.search }).toArray()

            return users
        }
    }
}
module.exports=resolvers