const Product = require("../models/product");

const getAllCars = async (req, res) => {
    const { mileage, listprice, colors, search } = req.query;
    const queryObject = {};

    if (mileage) {
        queryObject.mileage = mileage;
    }

    if (listprice) {
        queryObject.listprice = listprice;
    }

    if (colors) {
        queryObject.colors = colors;
    }

    // Handle search functionality
    if (search) {
        
        const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
        queryObject.$or = [
            { model: { $regex: searchRegex } },
            { year: { $regex: searchRegex } },
            { colors: { $regex: searchRegex } },
        ];
    }

    try {
        const myData = await Product.find(queryObject);
        res.status(200).json({ myData });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllCarsTesting = async (req, res) => {
    try {
        const myData = await Product.find(req.query);
        res.status(200).json({ myData });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUniqueModelsCount = async (req, res) => {
    try {
        const myData = await Product.find();
        const uniqueModels = [...new Set(myData.map(car => car.model))];
        const uniqueModelsCount = uniqueModels.length;
        res.status(200).json({ uniqueModelsCount });
    } catch (error) {
        console.error('Error fetching unique car models count:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getAllCars, getAllCarsTesting, getUniqueModelsCount};
