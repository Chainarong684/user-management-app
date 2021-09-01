const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const router = require("./server/routes/router");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is starting at http://localhost:${PORT}`);
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use("/", router);
