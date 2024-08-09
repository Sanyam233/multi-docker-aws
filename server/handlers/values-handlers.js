const pgClient = require("../services/postgres-service");
const redisClient = require("../services/redis-service");

const getAllValues = async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  return res.status(200).json({
    results: values.rows,
  });
};

const getCurrentValues = async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.status(200).json({
      results: values,
    });
  });
};

const submitIndex = async (req, res) => {
  const index = req.body.index;
  const redisPublisher = redisClient.duplicate();

  // Add the value to redis
  redisClient.hset("values", index, -1);
  redisPublisher.publish("insert", index);

  // Add the value to postgres
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.status(201).json({
    status: "IN_PROGRESS",
  });
};

module.exports = {
  getAllValues,
  getCurrentValues,
  submitIndex,
};
