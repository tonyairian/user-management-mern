const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
