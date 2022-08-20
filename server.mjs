import express from "express";
import * as fs from 'node:fs';
import * as http from 'http';
import * as https from 'https';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('dist'));

if (process.env.NODE_ENV != 'production') {
  const certs = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.crt')
  };
  https.createServer(certs, app).listen(port, () => {
    console.log(`HTTPS server is listening on port ${port}`)
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`HTTP server is listening on port ${port}`)
  });
};
