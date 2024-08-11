const redis = require("redis");
const keys = require("../keys");

const createRedisClient = async () => {
  console.log("IN HEREEE", keys.redisHost, keys.redisPort);
  try {
    const redisClient = redis.createClient({
      url: `redis://${keys.redisHost}:${keys.redisPort}`,
      socket: {
        connectTimeout: 5000, // in milliseconds
        timeout: 5000,
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            return null;
          }
          return Math.min(retries * 50, 500);
        },
      },
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
