const { Pool } = require("pg")
const keys = require("../keys")

const pgClient = new Pool({
    host : keys.pgHost,
    user : keys.pgUser,
    database : keys.pgDatabaseName,
    password : keys.pgPassword,
    port : keys.pgPort,
    ssl:
    process.env.NODE_ENV !== 'production'
      ? false
      : { rejectUnauthorized: false },
})

pgClient.on("error", () => {
    console.log("Postgres connection lost!!")
})

module.exports = pgClient