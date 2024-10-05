// test/controllers/employeeController.test.js

const employeeController = require('../controllers/employeeController');
const employeeService = require('../services/employeeService');

// Mock the employeeService module
jest.mock('../services/employeeService');

describe('Employee Controller', () => {
  let req, res;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock request and response objects
    req = {
      query: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('getEmployees', () => {
    it('should return employees by cafe', async () => {
      const employeesData = [
        { id: 1, name: 'John Doe', email_address: 'john@example.com', phone_number: '1234567890', days_worked: 100, cafe: 'Cafe A' },
        { id: 2, name: 'Jane Doe', email_address: 'jane@example.com', phone_number: '0987654321', days_worked: 80, cafe: 'Cafe A' },
      ];

      // Mock the getEmployeesByCafe method to resolve with employeesData
      employeeService.getEmployeesByCafe.mockResolvedValue(employeesData);
      req.query.cafe = 'Cafe A';

      await employeeController.getEmployees(req, res);

      expect(employeeService.getEmployeesByCafe).toHaveBeenCalledTimes(1);
      expect(employeeService.getEmployeesByCafe).toHaveBeenCalledWith('Cafe A');
      expect(res.json).toHaveBeenCalledWith(employeesData);
    });

    it('should handle service errors', async () => {
      // Mock the getEmployeesByCafe method to reject with an error
      employeeService.getEmployeesByCafe.mockRejectedValue(new Error('Service Error'));

      await employeeController.getEmployees(req, res);

      expect(employeeService.getEmployeesByCafe).toHaveBeenCalledTimes(1);
      expect(employeeService.getEmployeesByCafe).toHaveBeenCalledWith(undefined);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee and return 201 status', async () => {
      const newEmployee = { id: 1, name: 'John Doe', email_address: 'john@example.com', phone_number: '1234567890', gender: 'Male' };

      // Mock the createEmployee method to resolve with newEmployee
      employeeService.createEmployee.mockResolvedValue(newEmployee);
      req.body = newEmployee;

      await employeeController.createEmployee(req, res);

      expect(employeeService.createEmployee).toHaveBeenCalledTimes(1);
      expect(employeeService.createEmployee).toHaveBeenCalledWith(newEmployee);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newEmployee);
    });

    it('should handle errors when creating an employee', async () => {
      // Mock the createEmployee method to reject with an error
      employeeService.createEmployee.mockRejectedValue(new Error('Service Error'));
      req.body = { name: 'Jane Doe' };

      await employeeController.createEmployee(req, res);

      expect(employeeService.createEmployee).toHaveBeenCalledTimes(1);
      expect(employeeService.createEmployee).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
  });

  /*
  describe('updateEmployee', () => {
    it('should update an existing employee and return the updated employee', async () => {
        const updatedEmployee = {
            id: 1,
            name: 'John Doe Updated',
            email_address: 'johnupdated@example.com',
            phone_number: '9876543210',
            gender: 'Male'
        };

        // Mock the updateEmployee method to resolve with updatedEmployee
        employeeService.updateEmployee.mockResolvedValue(updatedEmployee);
        req.params = { id: '1' }; // ID should be a string if it's coming from req.params
        req.body = { name: 'John Doe Updated', email_address: 'johnupdated@example.com', phone_number: '9876543210', gender: 'Male' };

        await employeeController.updateEmployee(req, res);

        expect(employeeService.updateEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.updateEmployee).toHaveBeenCalledWith(1, req.body);
        expect(res.json).toHaveBeenCalledWith(updatedEmployee);
    });

    it('should return 404 if employee is not found', async () => {
        employeeService.updateEmployee.mockResolvedValue(null);
        req.params = { id: '99' }; // ID should be a string
        req.body = { name: 'Non-existing Employee' };

        await employeeController.updateEmployee(req, res);

        expect(employeeService.updateEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.updateEmployee).toHaveBeenCalledWith(99, req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should handle errors when updating an employee', async () => {
        employeeService.updateEmployee.mockRejectedValue(new Error('Service Error'));
        req.params = { id: '1' }; // ID should be a string
        req.body = { name: 'Error Employee' };

        await employeeController.updateEmployee(req, res);

        expect(employeeService.updateEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.updateEmployee).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
});

describe('deleteEmployee', () => {
    it('should delete an employee and return 204 status', async () => {
        employeeService.deleteEmployee.mockResolvedValue(true);
        req.params = { id: '1' }; // ID should be a string

        await employeeController.deleteEmployee(req, res);

        expect(employeeService.deleteEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if employee is not found when deleting', async () => {
        employeeService.deleteEmployee.mockResolvedValue(false);
        req.params = { id: '99' }; // ID should be a string

        await employeeController.deleteEmployee(req, res);

        expect(employeeService.deleteEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.deleteEmployee).toHaveBeenCalledWith(99);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should handle errors when deleting an employee', async () => {
        employeeService.deleteEmployee.mockRejectedValue(new Error('Service Error'));
        req.params = { id: '1' }; // ID should be a string

        await employeeController.deleteEmployee(req, res);

        expect(employeeService.deleteEmployee).toHaveBeenCalledTimes(1);
        expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
  });*/

});
