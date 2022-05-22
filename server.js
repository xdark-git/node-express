require("dotenv").config();
const { json } = require("express");
const express = require("express");
let app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use("/public", express.static(__dirname + "/public"));
app.use(logger);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const json_message = "Hello json";
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "upper") {
    res.json({
      message: json_message.toUpperCase(),
    });
  }
});

function logger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);

//Get Query parameters input from the client
app.get("/:word/echo", (req, res) => {
  var word = req.params.word;
  res.json({
    echo: word,
  });
});

////Get Query parameters input from the client
app.get("/name", (req, res) => {
  var firstname = req.query.first;
  var lastname = req.query.last;

  res.json({
    name: `${firstname} ${lastname}`,
  });
});

// Getting Client input from the index.htlm and responding with a json containing input

app.post("/name", (req, res) => {
  var firstname = req.body.first;
  var lastname = req.body.last;

  res.json({
    name: `${firstname} ${lastname}`,
  });
});
app.listen(port, () => console.log("server started on port " + port));
