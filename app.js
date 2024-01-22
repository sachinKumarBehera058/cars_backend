require("dotenv").config();
const express = require("express");
const cors = require('cors'); // Import the cors module

const app = express();
const connectDB = require("./db/connect");
connectDB();



const PORT = process.env.PORT || 5000;
app.use(cors());

const cars_routes = require("./routes/cars");


app.get("/", (req, res) => {
    res.send("Hi, I am Live");
});

const path = require('path');

app.use("/api", cars_routes);

app.listen(PORT, () => {
    console.log(`${PORT} Yes I am connected`);
});



