const oem = require("../models/product");

const getSimilarCarsCallback = async (req, res) => {
  const { model } = req.query;

  try {
    // Fetch all cars from the database
    const allCars = await oem.find({});

    // Filter exact match results based on the complete model name
    const exactMatchResults = allCars.filter(car => car.model.toLowerCase() === model.toLowerCase());

    if (exactMatchResults.length > 0) {
      // If there is an exact match, return it
      res.json(exactMatchResults);
    } else {
      // Calculate similarity scores for each car based on the model name
      const similarityScores = allCars.map(car => ({
        car,
        similarity: customSimilarity(model.toLowerCase(), car.model.toLowerCase()),
      }));

      // Filter results based on a threshold for similarity (adjust as needed)
      const threshold = 0.8; // You can adjust this value based on your requirements
      const similarCars = similarityScores.filter(score => score.similarity > threshold);

      // Sort the results by model similarity in descending order
      similarCars.sort((a, b) => b.similarity - a.similarity);

      res.json(similarCars.map(item => item.car));
    }
  } catch (error) {
    console.log('Error fetching similar cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to calculate similarity using custom algorithm
function customSimilarity(query, field) {
  // Handle potential undefined or null values
  if (!query || !field) {
    return 0;
  }

  // Tokenize the query into individual characters
  const queryTokens = query.split('');
  
  // Count the number of matching characters in the model name
  const matchCount = queryTokens.reduce((count, token) => {
    if (field.includes(token)) {
      return count + 1;
    }
    return count;
  }, 0);

  // Calculate a similarity score based on the match count and query length
  const similarity = matchCount / query.length;

  return similarity;
}

module.exports = { getSimilarCarsCallback };
