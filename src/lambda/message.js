import mailgun from "mailgun-js";
require("dotenv").config();

const DOMAIN = process.env.MG_DOMAIN;
const KEY = process.env.MG_KEY;
const RECIPIENT = process.env.RECIPIENT;

const mg = mailgun({ apiKey: KEY, domain: DOMAIN });

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case "POST": {
      const params = JSON.parse(event.body);
      const data = {
        from: `${params.name} <${params.email}>`,
        to: `${RECIPIENT}`,
        subject: `New ArtByPhotos Website Message`,
        text: `${params.message}`,
      };
      mg.messages().send(data, function(error, body) {});
      return {
        statusCode: 200,
        body: JSON.stringify(true),
      };
    }
    default: {
      return {
        statusCode: 404,
        body: "INVALID METHOD",
      };
    }
  }
};
