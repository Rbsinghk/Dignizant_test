const express = require("express");
const app = express();
require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

app.use(express.json({ limit: 100000000000 }));
app.use(bodyParser.json({ limit: 100000000000 }));
app.use(bodyParser.urlencoded({ limit: 100000000000, extended: true }));
app.use(cors());

const swaggerJson = require("./swagger/swagger.json");
const swaggerUi = require("swagger-ui-express");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// //Import Route
const registerRoute = require("./Routes/registerRoute");
const blogRoute = require("./Routes/blogRoute");
const commentRoute = require("./Routes/commentRoute");

// //Route MiddleWare
app.use("/v1", registerRoute);
app.use("/v1", blogRoute);
app.use("/v1", commentRoute);

app.use(express.static("./public/blog"));

app.use(cookieParser());

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

app.listen(port, () => {
  console.log(`The Port is Running at ${port}`);
});
