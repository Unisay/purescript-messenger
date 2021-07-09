"use strict";

const cors = require("cors")();
exports.jsonBodyParser = require("body-parser").json();

exports.cors = (req) => (res) => (nxt) => {
  debugger;
  cors(req, res, nxt);
};
