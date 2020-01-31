const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB Setup

mongoose.connect("mongodb://localhost:27017/auth", { useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("connected", function() {
    console.log("connected to db");
});

//App Setup
app.use(morgan("combined")); //morgain is used for debugg
app.use(bodyParser.json({ type: "*/*" })); //bodyParser is used to make any incoming request will be passed into json
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
