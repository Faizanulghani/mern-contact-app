const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", require("./routes/authRoute"));

app.listen(process.env.PORT, () => {
  console.log("server is running on port :" + process.env.PORT);
});
