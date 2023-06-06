const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectionDB } = require("./Database/mongodb");
const { appErrorHandler } = require("./Middlewares/appErrorHnadler");
const { ORIGIN_URL } = require("./Config");
const prefix = "/api";
const originURL = ORIGIN_URL;

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    credentials: true,
    origin: originURL,
  })
);
app.use(cookieParser());
connectionDB();
//Routings
app.use(`${prefix}/auth`, require("./Routes/auth"));
app.use(`${prefix}/movies`, require("./Routes/movies"));

app.use(appErrorHandler);
module.exports = app;
