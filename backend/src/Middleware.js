"use strict";

const express = require("express");
exports.json = express.json();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.cors = require("cors")(corsOptions);
