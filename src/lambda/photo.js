import axios from "axios";
import mongoose from "mongoose";
require("dotenv").config();
// create Photo schema
const { Schema } = mongoose;

// Photo Schema
const photoSchema = new Schema({
  id: String,
  title: String,
  albumId: String,
  dateStamp: Number,
  createStamp: Number,
  description: String,
  photoData: String,
  slug: String,
  tags: [String],
});
const Photo = mongoose.model("photo", photoSchema);

// Album Schema (for incrementing/decrementing Album Length)
const albumSchema = new Schema({
  id: String,
  length: Number,
});
const Album = mongoose.model("album", albumSchema);

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
      // Post Photo
      connectToDatabase();
      if (roleCheck === true) {
        try {
          const newPhoto = await Photo.create({
            id: params.id,
            title: params.title,
            albumId: params.albumId,
            dateStamp: params.dateStamp,
            createStamp: Math.floor(new Date().getTime() / 1000),
            description: params.description,
            photoData: params.photoData,
            slug: params.slug,
            tags: params.tags,
          });
          const inc = await Album.findOneAndUpdate(
            { id: params.albumId },
            { $inc: { length: 1 } }
          );
          return {
            statusCode: 201,
            body: JSON.stringify({
              id: newPhoto.id,
              inc: inc.length + 1,
            }),
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
      connectToDatabase();
      const query = event.queryStringParameters;
      const lookup = async q => {
        if (Object.entries(q).length === 0) {
          // TODO: Return 20 photos marked for the homepage
          // return await Album.find({}).then(data => {
          //   let results = [];
          //   data.forEach(d =>
          //     results.push({
          //       id: d.id,
          //       title: d.title,
          //       dateStamp: d.dateStamp,
          //       createStamp: d.createStamp,
          //       slug: d.slug,
          //       description: d.description,
          //       length: d.length,
          //     })
          //   );
          //   return results;
          // });
        } else {
          if (q.albumId) {
            if (q.photoData === "false") {
              // Return array of all photos in an album, no images
              return await Photo.find({ albumId: q.albumId }).then(
                data => {
                  let results = [];
                  data.forEach(d =>
                    results.push({
                      id: d.id,
                      title: d.title,
                      albumId: d.albumId,
                      dateStamp: d.dateStamp,
                      description: d.description,
                      slug: d.slug,
                      tags: d.tags,
                    })
                  );
                  return results;
                }
              );
            } else {
              // Return array of all photos in an album, with image data
              return await Photo.find({ albumId: q.albumId }).then(
                data => {
                  let results = [];
                  data.forEach(d =>
                    results.push({
                      id: d.id,
                      title: d.title,
                      albumId: d.albumId,
                      dateStamp: d.dateStamp,
                      description: d.description,
                      slug: d.slug,
                      tags: d.tags,
                      photoData: d.photoData,
                    })
                  );
                  return results;
                }
              );
            }
          }
          if (q.id) {
            if (q.photoData === "true") {
              return await Photo.find({ id: q.id }).then(data => {
                return data;
              });
            }
          }
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
      connectToDatabase();
      // PATCH Photo
      if (roleCheck === true) {
        try {
          const patchPhoto = await Photo.findOneAndUpdate(
            {
              id: params.id,
            },
            {
              title: params.title,
              dateStamp: params.dateStamp,
              description: params.description,
              slug: params.slug,
              tags: params.tags,
            }
          );
          return {
            statusCode: 201,
            body: JSON.stringify(patchPhoto.id),
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
      return {
        statusCode: 200,
        body: "DELETE",
      };
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
