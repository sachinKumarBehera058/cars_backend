require("dotenv").config();
const express = require("express");
const cors = require('cors'); // Import the cors module
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const connectDB = require("./db/connect");
const carsRoutes = require('./routes/cars');

app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;
app.use(cors());

const cars = [];
const cars_routes = require("./routes/cars");


app.get("/", (req, res) => {
    res.send("Hi, I am Live");
});


const path = require('path');

app.get('/api/cars/models/count', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'products.json'); // Adjust the file name accordingly
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const cars = JSON.parse(jsonData);

        const uniqueModelsCount = new Set(cars.map((car) => car.model)).size;
        res.json({ uniqueModelsCount });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//middleware or to set router

app.use("/api/cars", cars_routes);


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();