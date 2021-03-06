require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const params = JSON.parse(event.body);
  const client = new OAuth2Client(
    "848530449150-njlmg8c6lcmje64f10sjrbgmje8kp82c.apps.googleusercontent.com"
  );
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: params.idToken,
      audience:
        "848530449150-njlmg8c6lcmje64f10sjrbgmje8kp82c.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return userid;
  }
  let userid = await verify();
  if (
    userid === params.userid &&
    (params.userid === "104296086149649536703" ||
      params.userid === "112472186758723060910")
  ) {
    const token = jwt.sign(
      { userid, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days",
      }
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: token,
    };
  } else {
    return {
      statusCode: 401,
      body: "false",
    };
  }
};
