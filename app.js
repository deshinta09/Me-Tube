if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const {connect,getdb} = require('./config/mongodb')

const userScemas = require('./scemas/userScemas')
const postScemas = require('./scemas/postScemas')
const followScemas = require('./scemas/followScemas')

const userResolvers = require('./resolvers/userResolvers')
const postResolvers = require('./resolvers/postResolvers')
const followResolvers = require('./resolvers/followResolvers');
const authentication = require('./helpers/authentication');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
    typeDefs:[userScemas,postScemas,followScemas],
    resolvers:[userResolvers,postResolvers,followResolvers],
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

async function startServer(){
  await connect()
  const db = await getdb()
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.port || 4000 },
    introspection: true,
    context: ({req,res}) => {
      return {
        db,
        authentication: (()=>authentication(req,db))
      }
    }
  });
    
  console.log(`🚀  Server ready at: ${url}`);

}
startServer()