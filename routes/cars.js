const express=require("express");
const router = express.Router();

const {getUniqueModelsCount}=require("../controllers/count_car");
const {getSimilarCarsCallback}=require("../controllers/search_cars");
const {getAllCars}=require("../controllers/all_cars");
const {filterCars}=require("../controllers/filter_by_car");



router.route("/all").get(getAllCars);
router.route("/filter").get(filterCars);
router.route("/count").get(getUniqueModelsCount);
router.route("/search").get(getSimilarCarsCallback);


module.exports = router;
