const redis = require("redis");
const keys = require("../keys");

const createRedisClient = async () => {
  const redisClient = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    socket: {
      connectTimeout: 5000, // in milliseconds
      timeout: 5000,
      reconnectStrategy: (retries) => {
        if (retries > 5) {
          return new Error("Max retries reached");
        }
        return Math.min(retries * 50, 500);
      },
    },
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
