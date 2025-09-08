const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

module.exports = app;
