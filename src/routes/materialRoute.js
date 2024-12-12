const express = require('express');
const {
  addMaterialController,
  addMaterialImagesController,
  getAllMaterialController,
  getMaterialByIdController,
} = require('../controllers/materialController');
const router = express.Router();

router.post('/material', addMaterialController);
router.post('/material/images', addMaterialImagesController);
router.get('/material', getAllMaterialController);
router.get('/material/:id', getMaterialByIdController);

module.exports = router;
