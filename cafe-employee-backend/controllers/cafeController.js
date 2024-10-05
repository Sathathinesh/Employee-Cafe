const cafeService = require('../services/cafeService');
const logger = require('../logger');

const getCafes = async (req, res) => {
  try {
    logger.info(`Received request to get cafes with location: ${req.query.location}`);
    const cafes = await cafeService.getAllCafes(req.query.location);
    res.json(cafes);
  } catch (error) {
    logger.error(`Error getting cafes: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const createCafe = async (req, res) => {
  try {
    logger.info(`Received request to create cafe: ${req.body.name}`);
    const newCafe = await cafeService.createCafe(req.body);
    res.status(201).json(newCafe);
  } catch (error) {
    logger.error(`Error creating cafe: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateCafe = async (req, res) => {
  try {
    logger.info(`Received request to update cafe with id: ${req.body.id}`);
    const updatedCafe = await cafeService.updateCafe(req.body.id, req.body);
    res.json(updatedCafe);
  } catch (error) {
    logger.error(`Error updating cafe: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteCafe = async (req, res) => {
  try {
    logger.info(`Received request to delete cafe with id: ${req.body.id}`);
    await cafeService.deleteCafe(req.body.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting cafe: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
};
