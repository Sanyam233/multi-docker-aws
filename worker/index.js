const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
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
