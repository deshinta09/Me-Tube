const { ObjectId } = require("mongodb");

// controllernya
const resolvers = {
    Query: {
        getFollowers: async (_,__,contextValue)=>{ // data user pengikut difollow
            const user = await contextValue.authentication()
            const { db } = contextValue
            // console.log(user,'<-user yg login');

            const agg = [
                {
                  '$match': {
                    'followingId': user._id
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'followerId', 
                    'foreignField': '_id', 
                    'as': 'followers'
                  }
                }, {
                  '$project': {
                    'followers.password': 0
                  }
                }, {
                  '$unwind': {
                    'path': '$followers', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
              ]
            
            const coll = await db.collection('follows');
            const cursor = coll.aggregate(agg);
            const result = await cursor.toArray();

            // const findFollows= await db.collection('follows').find({followingId:user._id}).toArray()

            // console.log(result,'<- hasil followers');
            return result
        },
        getFollowings: async (_,__,contextValue)=>{ // data user yang diikuti
            const {db} = contextValue
            const user = await contextValue.authentication()

            const agg = [
              {
                '$match': {
                  'followerId': user._id
                }
              }, {
                '$lookup': {
                  'from': 'users', 
                  'localField': 'followingId', 
                  'foreignField': '_id', 
                  'as': 'followings'
                }
              }, {
                '$unwind': {
                  'path': '$followings', 
                  'preserveNullAndEmptyArrays': true
                }
              }, {
                '$project': {
                  'followings.password': 0
                }
              }
            ]

            const coll = await db.collection('follows');
            const cursor = coll.aggregate(agg);
            const result = await cursor.toArray();

            // let followings = await db.collection('follows').find({followerId:user._id}).toArray()

            return result
        }
    },
    Mutation: {
        createFollow: async (_,args, context)=>{
            const {db} = context
            const user = await context.authentication()
            // console.log(args,'<- args');
            // console.log(user._id,args.followingId,'<=user._id & args.followerId');

            if(user._id===args.followingId) return new Error("Follower already exists")

            let follower = await db.collection('follows').findOne({
              followingId: new ObjectId(args.followingId), // yg diikuti
              followerId: user._id
            })
            if(follower) return new Error("Follower already exists")
            // console.log(follower,'<- follower ');

            const newFollow= {
                followingId: new ObjectId(args.followingId), // yg diikuti
                followerId: user._id, // user yg mengikuti
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await db.collection('follows').insertOne(newFollow)
            // console.log(newFollow,'<- user yg difollow');
            return newFollow
        }
    }
}
module.exports=resolvers