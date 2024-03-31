const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.mongo_url;
// console.log(uri,'<<< url');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    client.db("sosmet")
  } catch(error) {
    await client.close()
  }
}

async function getdb(){
    return client.db("sosmet")
}

module.exports={connect,getdb,client}