require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = require("./config/corsOptions");

const app = express();

const PORT = 3000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
}
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(PORT, () => {
    console.log(`listening in port ${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to my news agent api");
});

app.use("/subscribers", require("./routes/subscriberRoutes"));
