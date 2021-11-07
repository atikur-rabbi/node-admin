const express = require('express');
const chalk = require('chalk');
const cors = require("cors");

const app = express()
const env = require("./config");
const error = require("./middleware/error");

const swaggerRoutes = require("./routes/swagger-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

require("./startup/db")();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.use("/docs", swaggerRoutes.routes);
app.use("/api", authRoutes.routes);
app.use("/api", userRoutes.routes);


app.use(error);

app.listen(env.port, () => {
  console.log((`Example app listening at ${chalk.green(`http://${env.host}:${env.port}`)} `))
})