import axios from "axios";
import mongoose from "mongoose";
require("dotenv").config();
// create Album schema
const { Schema } = mongoose;
const albumSchema = new Schema({
  id: String,
  title: String,
  createStamp: Number,
  dateStamp: Number,
  bgImg: String,
  description: String,
  slug: String,
  photos: [String],
});
const Album = mongoose.model("album", albumSchema);

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case "POST": {
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
      // connect to MongoDB
      const dbUrl = process.env.MONGO,
        dbOptions = { useNewUrlParser: true, useFindAndModify: true };
      mongoose.connect(dbUrl, dbOptions);
      // Post Photo
      if (roleCheck === true) {
        try {
          const newAlbum = await Album.create({
            id: params.id,
            title: params.title,
            createStamp: Math.floor(new Date().getTime() / 1000),
            dateStamp: params.dateStamp,
            bgImg: params.bgImg,
            description: params.description,
            slug: params.slug,
            photos: params.photos,
          });
          return {
            statusCode: 201,
            body: JSON.stringify(newAlbum.id),
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
    case "GET": {
      const dbUrl = process.env.MONGO,
        dbOptions = {
          useNewUrlParser: true,
          useFindAndModify: true,
        };
      mongoose.connect(dbUrl, dbOptions);
      const query = event.queryStringParameters;
      const lookup = async q => {
        if (Object.entries(q).length === 0) {
          return await Album.find({}).then(data => {
            console.log(data);
            let results = [];
            data.forEach(d =>
              results.push({
                id: d.id,
                title: d.title,
                dateStamp: d.dateStamp,
                bgImg: d.bgImg,
                slug: d.slug,
                photos: d.photos,
              })
            );
            return results;
          });
        } else {
          return await Album.findOne({
            $or: [{ slug: q.slug }, { id: q.id }],
          }).then(data => {
            return {
              id: data.id,
              title: data.title,
              dateStamp: data.dateStamp,
              bgImg: data.bgImg,
              slug: data.slug,
              photos: data.photos,
            };
          });
        }
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
      // connect to MongoDB
      const dbUrl = process.env.MONGO,
        dbOptions = { useNewUrlParser: true, useFindAndModify: true };
      mongoose.connect(dbUrl, dbOptions);
      // PATCH Photo
      if (roleCheck === true) {
        try {
          const patchAlbum = await Album.findOneAndUpdate(
            {
              id: params.id,
            },
            {
              title: params.title,
              dateStamp: params.dateStamp,
              bgImg: params.bgImg,
              description: params.description,
              slug: params.slug,
              photos: params.photos,
            }
          );
          return {
            statusCode: 201,
            body: JSON.stringify(patchAlbum.id),
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
    case "DELETE": {
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
      // connect to MongoDB
      const dbUrl = process.env.MONGO,
        dbOptions = { useNewUrlParser: true, useFindAndModify: true };
      mongoose.connect(dbUrl, dbOptions);
      // DELETE Photo
      if (roleCheck === true) {
        try {
          const deleteAlbum = await Album.findOneAndRemove({
            id: params.id,
          });
          return {
            statusCode: 201,
            body: JSON.stringify(deleteAlbum.id),
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
