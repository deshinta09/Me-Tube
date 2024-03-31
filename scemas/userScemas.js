const typeDefs = `#graphql
type User {
    _id:ID,
    name: String
    username: String!
    email: String!
    img: String
}

type access_token {
    access_token: String
}

#Query = getnya
#mutation = merubah data (create,update,delete)
# skema = endpoint
type Query {
    # getUsers : [User]
    getUserById: User
}

type Mutation {
    register (name: String,username: String,email: String,password: String, img:String) : User
    login (email: String,password: String) : access_token
    search (search: String) : [User]
}
`
module.exports=typeDefs