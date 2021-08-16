const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const router = require("./server/routes/router");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`server is starting at http://localhost:${PORT}`);
});
