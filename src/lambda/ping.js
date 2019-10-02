'use strict';
const express = require("express");
const path = require("path");
const serverless = require('serverless-http');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json("pong!");
});

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/.netlify/lambda/ping", router);
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../build/index.html")));

module.exports = app;
module.exports.handler = serverless(app);