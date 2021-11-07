const express = require('express');
const chalk = require('chalk');

const app = express()
const env = require("./config");
const host = env.host;
const port = env.port;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log((`Example app listening at ${chalk.green(`http://${host}:${port}`)} `))
})