const Product = require("../models/product");

const getUniqueModelsCount = async (req, res) => {
    try {
        const myData = await Product.countDocuments();
        res.status(200).json({ myData});
    } catch (error) {
        console.error('Error fetching unique car models count:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUniqueModelsCount};
