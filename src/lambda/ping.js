exports.handler = (event, context, callback) => {
  if (event.httpMethod !== "GET") {
    return callback(null, { statusCode: 405, body: "Method not allowed" });
  }
  switch(event.path){
    case "ping":{
      return callback(null, {statusCode: 200, body: "Pong!" });
    }
    default:
      return callback(null, {statusCode: 404, body: "Not found" })
  }
}