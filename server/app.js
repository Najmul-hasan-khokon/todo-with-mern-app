const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoHandler = require("./todoHandler");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost/crud-with-react")
  .then(() => console.log("server connection successfully!"))
  .catch((err) => console.log(err));

app.use("/todo", todoHandler);

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.use((req, res, next) => {
  res.status(500).json({ message: "not found" });
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    res.status(500).send("there was a server side error");
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log("app is listenning on 3000");
});
