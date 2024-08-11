const redis = require("redis");
const keys = require("../keys");

const createRedisClient = async () => {
  const redisClient = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: () => 1000,
  });

  try {
    await redisClient.connect();
    console.log("Successfully connected");
    return redisClient;
  } catch (err) {
    console.log("Redis couldn't connect", err);
    process.exit(1);
  }
};

module.exports = { createRedisClient };
