const pgClient = require("../services/postgres-service");
const redisClient = require("../services/redis-service");

const getAllValues = async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * FROM values");
    return res.status(200).json({
      results: values.rows,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const getCurrentValues = async (req, res) => {
  try {
    redisClient.hGetAll("values", (err, values) => {
      res.status(200).json({
        results: values,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const submitIndex = async (req, res) => {
  try {
    const index = req.body.index;
    const redisPublisher = redisClient.duplicate();

    // Add the value to redis
    redisClient.hSet("values", index, -1);
    redisPublisher.publish("insert", index);

    // Add the value to postgres
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

    res.status(201).json({
      status: "IN_PROGRESS",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  getAllValues,
  getCurrentValues,
  submitIndex,
};
