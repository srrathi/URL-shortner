const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDb connected successfully"))
  .catch((err) => console.log(err.message));

app.use(express.static(path.join(__dirname, "..", "build")));
// Routes Config
app.use(
  express.json({
    extended: false,
  })
); //parse incoming request body in JSON format.
app.use("/", require("./routes/Redirect"));
app.use("/api/url", require("./routes/Url"));

// Listen for incoming requests
app.listen(PORT, () =>
  console.log(`server started, listening at PORT ${PORT}`)
);
