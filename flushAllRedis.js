const redis = require("./config/redis");

(async () => {
    await redis.del("post:all");
    console.log('flushed')
})()