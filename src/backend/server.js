var express = require("express");
var http = require("http");
var https = require("https");
var bodyParser = require("body-parser");
var env = process.env.NODE_ENV || "development";
var cors = require("cors");
var path = require("path");

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const teamRoutes = require("./api/routes/Team");
const reportRoutes = require("./api/routes/Report");
const matchRoutes = require("./api/routes/Match");
const judgeRoutes = require("./api/routes/Judge");
const divisionRoutes = require("./api/routes/Division");
require("dotenv").config();

// MONGO
mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// END MONGO

// EXPRESS USE
app.use(morgan("dev"));

var corsOptions = {
  origin: "*",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Content-Length",
    "X-Requested-With",
    "Accept",
    "token",
    "content-type",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (env === "production") app.use(express.static("build"));
// END OF EXPRESS USE

//ROUTES
app.use("/api/teams", teamRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/judges", judgeRoutes);
app.use("/api/divisions", divisionRoutes);
app.delete("/api/db/dropall", (req, res) => {
  mongoose
    .createConnection(process.env.mongourl)
    .dropDatabase((err, results) => {
      if (!!err)
        return res
          .status(500)
          .json({ error: { message: "Could not clear database" } });
      return res.status(201).json({ success: { message: "Cleared database" } });
    });
});
app.get("/auth", (req, res) => {
  if (!process.env.frontendauth)
    return res
      .status(500)
      .json({ error: { message: "Server has incorrect auth set up" } });
  return res
    .status(200)
    .json({
      password: Buffer.from(process.env.frontendauth).toString("base64"),
    });
});
// END OF ROUTES

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const protocol = http;
const port = process.env.BACKEND_PORT || 4000;

protocol
  .createServer({}, app)
  .listen(port, function () {
    console.log("Our project is running! ", new Date().toString());
    console.log("Running on port", port);
    console.log("Environment: ", env);
  })
  .on("error", function (err) {
    console.error(JSON.stringify(err));
  });
