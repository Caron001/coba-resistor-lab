const express = require("express");
const { predictResistor, getHistory } = require("../controllers/modelController");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("image"), predictResistor);
router.get("/history", getHistory);

module.exports = router;
