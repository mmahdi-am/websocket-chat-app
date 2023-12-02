const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require("peer");
const port = "9000";

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/peer-server",
  ssl: {},
});

app.use(peerServer);



server.listen(port);
console.log(`Listening on: ${port}`);