const typeDefs = `#graphql
type User {
    _id:ID,
    name: String
    username: String!
    email: String!
}

type Followers {
    _id:ID!,
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    followers: User
}

type Followings {
    _id:ID!,
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    followings: User
}

type Follow {
    _id:ID!,
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
}

#Query = getnya
#mutation = merubah data (create,update,delete)
# skema = endpoint
type Query {
    getFollowers : [Followers]
    getFollowings : [Followings]
}

type Mutation {
    createFollow (followingId: ID) : Follow
}
`
module.exports=typeDefs