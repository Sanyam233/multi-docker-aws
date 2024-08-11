const keys = require("./keys");
const redis = require("redis");

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

(async () => {
  try {
    await redisClient.connect();
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    const fib = (index) => {
      dp = [0, 1];

      for (let i = 2; i <= index; i++) {
        dp.push(dp[i - 1] + dp[i - 2]);
      }

      return dp[index];
    };

    subscriber.subscribe("insert", async (message) => {
      await redisClient.hSet("values", message, fib(parseInt(message)));
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    process.exit(1);
  }
})();
