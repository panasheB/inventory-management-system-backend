const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const nodemailer = require('nodemailer');


require('dotenv').config()
const app = express();
const cors = require('cors');
const prefix = '/mongo'
app.use(cors({
    origin: '*'
}));


app.use(express.json());
mongoose.connect(
  `${process.env.DB_URL}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});

//---- ROUTER IMPORTS ------

const prediction_router = require("./routes/prediction_router")
const transactions_router = require("./routes/transactions_router")
const items_router = require("./routes/items_router")
const dashboard_router = require("./routes/dashboard_router")
const email_router = require("./routes/email_router")
const whatsApp_router = require("./routes/whatsApp_router")
const assets_router = require("./routes/assets_router")
const assets_maintanance_router = require("./routes/assets_maintanance_router")
const assets_trans_router = require("./routes/assets_trans_router")
const assets_category_router = require("./routes/assets_category_router")
const expense_category_router = require("./routes/expense_category_router")
const expense_router = require("./routes/expenses_router")




//---- ROUTER APP USE IMPLEMENTATION ------

app.use(`${prefix}/predictions`,prediction_router);
app.use(`${prefix}/transactions`,transactions_router);
app.use(`${prefix}/items`,items_router);
app.use(`${prefix}/dashboard`,dashboard_router);
app.use(`${prefix}/email`, email_router);
app.use(`${prefix}/whatsapp`, whatsApp_router);
app.use(`${prefix}/`,assets_router);
app.use(`${prefix}/`,assets_maintanance_router);
app.use(`${prefix}/`,assets_trans_router);
app.use(`${prefix}/`,assets_category_router);
app.use(`${prefix}/`, expense_category_router);
app.use(`${prefix}/`, expense_router);


app.listen(3061, () => {
  console.log("Server is running at port 3061");
});

