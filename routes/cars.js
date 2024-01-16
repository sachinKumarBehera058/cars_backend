const express=require("express");
const router = express.Router();

const {getAllCars,getAllCarsTesting,getUniqueModelsCount}=require("../controllers/cars");

router.route("/").get(getAllCars);
router.route("/testing").get(getAllCarsTesting);
router.route("/models/count").get(getUniqueModelsCount);

module.exports = router;