const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const patientRouter = require("./routers/patient-router");

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", patientRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
