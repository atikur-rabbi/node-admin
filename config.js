require("dotenv").config();
const assert = require("assert");

const { mongodb } = process.env;
assert(mongodb, "Database is required");


const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

module.exports = {
  port,
  host,
  mongodb,
};
