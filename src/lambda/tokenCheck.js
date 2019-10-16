require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const params = JSON.parse(event.body);
  const verify = jwt.verify(params.token, process.env.JWT_SECRET);
  if (Math.round(new Date().getTime() / 1000) < verify.exp) {
    return {
      statusCode: 200,
      body: verify.role,
    };
  } else {
    return {
      statusCode: 401,
      body: false,
    };
  }
};
