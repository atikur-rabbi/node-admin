const mongoose = require("mongoose");
const env = require("../config");

module.exports = () => {
  mongoose
    .connect(env.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."));
};
