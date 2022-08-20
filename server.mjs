import express from "express";
import * as fs from 'node:fs';
import * as https from 'https';

const port = process.env.PORT || 8080;
const certs = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.crt')
};
const server = express();
server.use(express.static('dist'));
https.createServer(certs, server).listen(port, () => {
  console.log(`HTTP server is listening on port ${port}`)
})
