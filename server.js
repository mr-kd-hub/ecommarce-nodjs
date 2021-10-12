const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const likeRoute = require("./routers/likeRoute");
const commentRoute = require("./routers/commentRoute");
const userRoute = require("./routers/userRoute");
const categoryRoute = require("./routers/categoryRouter");
const productRoute = require("./routers/productRoute");
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 9000;

//database connected
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected..." + process.env.DATABASE);
  })
  .catch((err) => {
    console.log("Something Went Wrong while Connecting To Database...." + err);
  });
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/like", likeRoute);
app.use("/comment", commentRoute);
app.listen(port, () => {
  console.log("Server Started..." + port);
});
