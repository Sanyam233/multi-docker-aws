const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pgClient = require("./services/postgres-service");
const valuesRouter = require("./routes/values-routes");
const { createRedisClient } = require("./services/redis-service");

// Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres connection setup
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((error) => console.error(error));
});

(async () => {
  try {
    const redisClient = await createRedisClient();
    app.use(async (req, res, next) => {
      req.redisClient = redisClient;
      next();
    });

    app.listen(8000, () => {
      console.log("App running on port: ", 8000);
    });
  } catch (err) {
    console.log("[ERROR]", err);
  }
})();

app.use("/api/v1/values", valuesRouter);
