const typeDefs = `#graphql
type User {
    _id:ID,
    name: String
    username: String!
    email: String!
}

type Post {
    _id:ID!,
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    author: User
}


type Comment {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
}

type Like {
    username: String!
    createdAt: String
    updatedAt: String
}

input NewPost {
    content: String
    tags: [String]
    imgUrl: String
}

type PostById {
    _id:ID!,
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    username: User
}

#Query = getnya
#mutation = merubah data (create,update,delete)
# skema = endpoint
type Query {
    getPosts : [Post]
    getPostById (id: String) : PostById
}

type Mutation {
    createPost (NewPost:NewPost) : Post
    createComment (content: String, postId: ID) : Comment
    createLike (postId: ID) : Like
}
`
module.exports=typeDefs