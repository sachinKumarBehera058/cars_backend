const Product = require("../models/product");

const getAllCars = async (req, res) => {
  try {
    // Fetch all cars from the database
    const allCars = await Product.find();

    // Return the list of cars as JSON
    res.status(200).json({ cars: allCars });
  } catch (error) {
    console.error('Error fetching all cars:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllCars };
