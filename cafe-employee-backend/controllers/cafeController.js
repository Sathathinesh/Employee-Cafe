const cafeService = require('../services/cafeService');

const getCafes = async (req, res) => {
  try {
    const cafes = await cafeService.getAllCafes(req.query.location);
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCafe = async (req, res) => {
  try {
    const newCafe = await cafeService.createCafe(req.body);
    res.status(201).json(newCafe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCafe = async (req, res) => {
  try {
    const updatedCafe = await cafeService.updateCafe(req.body.id, req.body);
    res.json(updatedCafe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCafe = async (req, res) => {
  try {
    await cafeService.deleteCafe(req.body.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
};
