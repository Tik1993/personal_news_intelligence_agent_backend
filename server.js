const express = require("express");
const cors = require("cors");

const corsOptions = require("./config/corsOptions");

const app = express();
app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log("listening in port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to my news agent api");
});
