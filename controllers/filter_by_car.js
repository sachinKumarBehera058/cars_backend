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
  const filter_cars = req.query;

  try {
    const searchQuery = filter_cars.model;
    const colorFilter = filter_cars.colors;
    const mileageMin = filter_cars.mileageMin;
    const mileageMax = filter_cars.mileageMax;
    const priceMin = filter_cars.priceMin;
    const priceMax = filter_cars.priceMax;

    const textSearchQuery = {
      model: { $regex: new RegExp(searchQuery, 'i') }
    };
   
    const colorFilters = colorFilter && colorFilter !== 'All' ? { $in: colorFilter.split(',') } : null;
    const additionalFilters = {};

    // Check if colorFilter is provided
    if (colorFilters) {
      additionalFilters.colors = colorFilters;
    }
    
    // Check if priceMin and priceMax are valid numbers
    if (!isNaN(priceMin) && !isNaN(priceMax) && priceMin !== 0 && priceMax !== 300000) {
      additionalFilters.listPrice = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
    }

    // Check if mileageMin and mileageMax are valid numbers
    if (!isNaN(mileageMin) && !isNaN(mileageMax) && mileageMin !== 'All' && mileageMax !== 'All') {
      additionalFilters.mileage = { $gte: parseFloat(mileageMin), $lte: parseFloat(mileageMax) };
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