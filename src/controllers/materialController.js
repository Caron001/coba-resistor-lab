const { nanoid } = require('nanoid');
const { newMaterial, newImage, getMaterial, getMaterialById } = require('../models/materialModel');

const addMaterialController = async (req, res) => {
  const id = nanoid(16);
  const data = {
    idmaterials: id,
    title: req.body.title,
    text_material: req.body.text_material,
  };
  try {
    await newMaterial(data);
    res.status(201).json({
      message: 'Material added successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addMaterialImagesController = async (req, res) => {
  const id = nanoid(16);
  const data = {
    idmaterial_images: id,
    idmaterials: req.body.idmaterials,
    url_image: req.body.url_image,
  };
  try {
    await newImage(data);
    res.status(201).json({
      message: 'Image added successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.messages,
    });
  }
};

const getAllMaterialController = async (req, res) => {
  try {
    const materials = await getMaterial();
    res.status(200).json({
      message: 'Materials successfully display',
      data: materials,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMaterialByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await getMaterialById(id);
    if (!material) {
      return res.status(404).json({
        message: 'Material not found',
      });
    }
    res.status(200).json({
      message: `Material with id ${id} successfully display`,
      data: material,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addMaterialController,
  addMaterialImagesController,
  getAllMaterialController,
  getMaterialByIdController,
};
