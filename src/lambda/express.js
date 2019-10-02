'use strict';
const express = require("express");
const cors = require('cors')
const serverless = require('serverless-http');
const app = express();
const bodyParser = require("body-parser");

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong!');
});

module.exports = app;
module.exports.handler = serverless(app);