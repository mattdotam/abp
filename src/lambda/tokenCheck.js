require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const params = JSON.parse(event.body);
  jwt.verify(params.token, process.env.JWT_SECRET);
};
