const redis = require("redis");
const keys = require("../keys");

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
});

module.exports = redisClient;
