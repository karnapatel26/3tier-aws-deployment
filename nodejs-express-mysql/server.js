const express = require("express");
const cors = require("cors");

const app = express();

// Allow all origins (demo mode)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to karna's application." });
});

require("./app/routes/tutorial.routes.js")(app);

const serverless = require('serverless-http');
module.exports.handler = serverless(app);