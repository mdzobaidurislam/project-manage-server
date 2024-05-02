const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("../config/config");
const web = require("../routes/web");
connectDb();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
// register api routes
app.use("/api", web);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
