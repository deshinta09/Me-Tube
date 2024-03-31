const Redis = require('ioredis')
const secret = process.env.password_redis

const redis = new Redis({
    port: 15304, // Redis port
    host: "redis-15304.c1.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
    password: secret
  });

module.exports = redis