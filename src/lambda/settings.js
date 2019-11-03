import axios from "axios";
import mongoose from "mongoose";
require("dotenv").config();

const { Schema } = mongoose;

const settingSchema = new Schema({
  instagram: String,
  facebook: String,
  linkedin: String,
  twitter: String,
});

const Setting = mongoose.model("setting", settingSchema);

// Connect to MongoDB
const dbUrl = process.env.MONGO,
  dbOptions = { useNewUrlParser: true, useFindAndModify: true };

let cachedDB = null;

function connectToDatabase() {
  if (cachedDB) {
    return Promise.resolve(cachedDB);
  }

  mongoose.connect(dbUrl, dbOptions).then(db => {
    cachedDB = db;
    return cachedDB;
  });
}

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case "GET": {
      connectToDatabase();
      const query = event.queryStringParameters;
      const lookup = async q => {
        return await Setting.find({}).then(results => {
          return results;
        });
      };
      return {
        statusCode: 200,
        body: JSON.stringify(await lookup(query)),
      };
    }
    case "PATCH": {
      // authenticate
      const params = JSON.parse(event.body);
      const roleCheck = await axios
        .post(
          `${process.env.SITE_ROOT}/.netlify/functions/tokenCheck`,
          {
            token: params.token,
          }
        )
        .then(tokenCheck => {
          if (tokenCheck.data === "admin") {
            return true;
          } else {
            return false;
          }
        });
      connectToDatabase();
      // PATCH Photo
      if (roleCheck === true) {
        try {
          await Setting.findOneAndUpdate(
            {},
            {
              instagram: params.instagram,
              facebook: params.facebook,
              twitter: params.twitter,
              linkedin: params.linkedin,
            }
          );
          return {
            statusCode: 201,
          };
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message }),
          };
        }
      } else {
        return {
          statusCode: 401,
          body: "NEED LOGIN",
        };
      }
    }
    default: {
      return {
        statusCode: 404,
        body: "INVALID METHOD",
      };
    }
  }
  // const params = JSON.parse(event.body);
  // const verify = jwt.verify(params.token, process.env.JWT_SECRET);
};
