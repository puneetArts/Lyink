const express = require("express");
const router = express.Router();
const { getColleges } = require("../controllers/collegeController");
router.get("/", getColleges);
// router.post("/", addCollege); // For initial data seeding only
module.exports = router;
