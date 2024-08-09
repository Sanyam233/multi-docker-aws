const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

const fib = (index) => {
  dp = [0, 1];

  for (let i = 2; i <= index; i++) {
    dp.push(dp[i - 1] + dp[i - 2]);
  }

  return dp[index];
};

sub.on("message", (_, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
