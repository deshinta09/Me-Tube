const redis = require("../config/redis");
const { ObjectId } = require("mongodb");

// controllernya
const resolvers = {
  Query: {
    getPosts: async (_, __, contextValue) => {
      try {
        contextValue.authentication()
        const { db } = contextValue;

        const agg = [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'authorId', 
              'foreignField': '_id', 
              'as': 'author'
            }
          }, {
            '$unwind': {
              'path': '$author', 
              'preserveNullAndEmptyArrays': true
            }
          }, {
            '$project': {
              'author.password': 0
            }
          }, {
            '$sort': {
              'createdAt': -1
            }
          }
        ]

        let result = await redis.get("post:all");
        if (result) {
          result = JSON.parse(result);
          
          return result;
        }
        // get db (Book.findAll())
        // console.log(db,'<<< db');
        const coll = await db.collection("posts");
        const cursor = coll.aggregate(agg);
        result = await cursor.toArray();

        await redis.set("post:all", JSON.stringify(result));

        return result;
      } catch (err) {
        console.log(err)
      }
    },
    getPostById: async (_, args, contextValue) => {
      contextValue.authentication();
      const { db } = contextValue;

      const agg = [
        {
          $match: {
            _id: new ObjectId(args.id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "username",
          },
        },
        {
          $unwind: {
            path: "$username",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "username.password": 0,
          },
        },
      ];
      const coll = await db.collection("posts");
      const cursor = coll.aggregate(agg);
      const result = await cursor.toArray();
      //   console.log(result[0],'<<- result');
      return result[0];
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      let user = await context.authentication();
      const { db } = context;

      const newPost = {
        content: args.NewPost.content,
        tags: args.NewPost.tags,
        imgUrl: args.NewPost.imgUrl,
        authorId: user._id,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        likes: [],
      };

      await db.collection("posts").insertOne(newPost);
      await redis.del("post:all");
      return newPost;
    },
    createComment: async (_, args, context) => {
      const { db } = context;
      let user = await context.authentication();

      let newComment = {
        content: args.content,
        username: user.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // menambah comments
      // await db.collection('comments').insertOne(newComment)

      // nambah comments di post
      await db
        .collection("posts")
        .updateOne(
          { _id: new ObjectId(args.postId) },
          { $push: { comments: newComment } }
        );

      await redis.del("post:all");

      return newComment;
    },
    createLike: async (_, args, context) => {
      const { db } = context;
      let user = await context.authentication();

      let newLike = {
        username: user.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // await db.collection('likes').insertOne(newLike)

      // nambah like di post
      await db
        .collection("posts")
        .updateOne(
          { _id: new ObjectId(args.postId) },
          { $push: { likes: newLike } }
        );

      await redis.del("post:all");

      return newLike;
    },
  },
};
module.exports = resolvers;
