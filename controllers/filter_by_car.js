const oem = require("../models/product");

// Helper function to calculate similarity using a custom algorithm
function customSimilarity(query, field) {
  if (!query || !field) {
    return 0;
  }

  const queryTokens = query.split('');
  const matchCount = queryTokens.reduce((count, token) => {
    if (field.includes(token)) {
      return count + 1;
    }
    return count;
  }, 0);

  const similarity = matchCount / query.length;
  return similarity;
}

const filterCars = async (req, res) => {
  // console.log(req.query);
  const filter_cars = req.query;

  try {
    const searchQuery = filter_cars.model;
    const colorFilter = filter_cars.colors;
    const mileageFilter = filter_cars.mileage;
    const priceFilter = filter_cars.price;

    const textSearchQuery = {
      model: { $regex: new RegExp(searchQuery, 'i') }
    };

    const additionalFilters = {};

    // Check if colorFilter is provided
    if (colorFilter && colorFilter !== 'All') {
      additionalFilters.colors = { $eq: colorFilter };
    }

    // Check if priceFilter is a valid number
    if (!isNaN(priceFilter) && priceFilter !== 'All') {
      additionalFilters.listPrice = { $lte: parseFloat(priceFilter) };
    }

    // Check if mileageFilter is a valid number
    if (!isNaN(mileageFilter) && mileageFilter !== 'All') {
      additionalFilters.mileage = { $lte: parseFloat(mileageFilter) };
    }

    let query;

    // Combine text search query with additional filters
    if (Object.keys(additionalFilters).length === 0) {
      // If no additional filters, use only textSearchQuery
      query = textSearchQuery;
    } else {
      // If additional filters present, combine with $and
      query = {
        $and: [textSearchQuery, additionalFilters]
      };
    }

    // console.log(query);

    const allCars = await oem.find(query);

    if (allCars.length === 0 && searchQuery) {
      const similarCars = await getSimilarCars(searchQuery);
      res.json(similarCars);
    } else {
      res.json(allCars);
    }
  } catch (error) {
    console.error('Error filtering cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getSimilarCars(query) {
  const allCars = await oem.find({});

  const similarityScores = allCars.map(car => ({
    car,
    similarity: customSimilarity(query.toLowerCase(), car.model.toLowerCase()),
  }));

  const threshold = 0.8;
  const similarCars = similarityScores.filter(score => score.similarity > threshold);

  similarCars.sort((a, b) => b.similarity - a.similarity);

  return similarCars.map(item => item.car);
}

module.exports = { filterCars };
