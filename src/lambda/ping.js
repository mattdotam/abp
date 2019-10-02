'use strict';
const serverless = require('serverless-http');
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json("pong!");
});

module.exports = app;
module.exports.handler = serverless(app);