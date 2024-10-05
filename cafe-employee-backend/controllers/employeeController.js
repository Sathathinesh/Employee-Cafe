const employeeService = require('../services/employeeService');
const logger = require('../logger');

const getEmployees = async (req, res) => {
  try {
    logger.info(`Received request to get employees for cafe: ${req.query.cafe}`);
    const employees = await employeeService.getEmployeesByCafe(req.query.cafe);
    res.json(employees);
  } catch (error) {
    logger.error(`Error getting employees: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    logger.info(`Received request to create employee: ${req.body.name}`);
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    logger.error(`Error creating employee: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    logger.info(`Received request to update employee with id: ${req.body.id}`);
    const updatedEmployee = await employeeService.updateEmployee(req.body.id, req.body);
    res.json(updatedEmployee);
  } catch (error) {
    logger.error(`Error updating employee: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    logger.info(`Received request to delete employee with id: ${req.body.id}`);
    await employeeService.deleteEmployee(req.body.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting employee: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
