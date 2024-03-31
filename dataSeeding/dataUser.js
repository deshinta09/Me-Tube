const users = [
    {
        name: 'Ani',
        username: "ani",
        email: "ani@mail.com",
        password: hashPassword("secret"), 
        img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Boo",
        username: "Bo Bi Bu",
        email: "bo@mail.com",
        password: hashPassword("secret"), 
        img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
    },
    {
        name: "Mou",
        username: "Mou Mii",
        email: "mou@mail.com",
        password: hashPassword("secret"), 
        img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
    }
]


// const { getdb, connect } = require("../config/mongodb");
// const { hashPassword } = require("../helpers/bcrypt");

// async function seedUser(){
//     try {
//         // await connect()
//         // const db = await getdb()
//         const users = [
//             {
//                 name: 'Ani',
//                 username: "ani",
//                 email: "ani@mail.com",
//                 password: hashPassword("secret"), 
//                 img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             },
//             {
//                 name: "Boo",
//                 username: "Bo Bi Bu",
//                 email: "bo@mail.com",
//                 password: hashPassword("secret"), 
//                 img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
//             },
//             {
//                 name: "Mou",
//                 username: "Mou Mii",
//                 email: "mou@mail.com",
//                 password: hashPassword("secret"), 
//                 img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
//             }
//         ]
//         // let all = await db.collection('users').insertMany(users)

//         const client = await MongoClient.connect(
//             'mongodb+srv://deshinta:QjTtQAeegwPYwwck@data-books.b3fitbi.mongodb.net/'
//         );
          
//         let all = await client.db('sosmet').collection('users').insertMany(users)
//         await client.close();

//         console.log(all);
//         console.log('success seed');
//     } catch (error) {
//         await client.close()
//         console.log(error);
//     }
// }
// seedUser()