const redis = require("redis");
const keys = require("../keys");

const createRedisClient = async () => {
  console.log("IN HEREEE", keys.redisHost, keys.redisPort);
  try {
    const redisClient = redis.createClient({
      url: `redis://${keys.redisHost}:${keys.redisPort}`,
      debug: true,
    });
    await redisClient.connect();
    console.log("Successfully connected");
    return redisClient;
  } catch (err) {
    console.log("[ERROR]", err.message);
    throw err;
  }
};

module.exports = { createRedisClient };
