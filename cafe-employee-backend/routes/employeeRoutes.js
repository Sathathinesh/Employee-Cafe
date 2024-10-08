const express = require('express');
const cors = require('cors');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.options('*', cors())

router.get('/employees', employeeController.getEmployees);
router.post('/employee', employeeController.createEmployee);
router.put('/employee', employeeController.updateEmployee);
router.delete('/employee', employeeController.deleteEmployee);

module.exports = router;
