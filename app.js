const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require('path')
require("dotenv").config();

const connectDB = require("./config/db");
const indexRoute = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public, uploads")));

//end point
app.use("/api/v1", indexRoute);

//error handler
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`Server is running on port: ${process.env.PORT || 8000}`);
});
