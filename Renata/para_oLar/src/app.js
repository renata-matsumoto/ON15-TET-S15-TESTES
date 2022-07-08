const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

require("dotenv-safe").config();

const db = require("./config/database");
db.connect();

const livrariasRotas = require("./routes/livrariasRoutes");

app.use("/livrarias", livrariasRotas);

module.exports = app;
