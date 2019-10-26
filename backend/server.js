const http = require('http');
const app = require('./app');

const port = 8080;
app.set('port', port)
const server = http.createServer(app);

var mongo_host = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_HOST) {
    mongohost = "mongodb://" + process.env.MONGODB_HOST;
}

server.listen(port, () => {
  console.log('server started on 8080 and mongo host ' + mongohost)
});
