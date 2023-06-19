const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const DB = require("./database/connection");
const app = express();
const path = require("path");
var morgan = require("morgan");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "image")));
app.use("/", authRoutes);
app.use("/admin", adminRoutes);

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});
