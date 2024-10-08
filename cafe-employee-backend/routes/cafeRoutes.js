const express = require('express');
const cors = require('cors');
const router = express.Router();
const cafeController = require('../controllers/cafeController');

router.options('*', cors())

router.get('/cafes', cafeController.getCafes);
router.post('/cafe', cafeController.createCafe);
router.put('/cafe', cafeController.updateCafe);
router.delete('/cafe', cafeController.deleteCafe);

module.exports = router;
