const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const employeeController = require('../controllers/employeeController');
const employeeService = require('../services/employeeService');

describe('Employee Controller', () => {
  let req, res, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub()
    };
    req = {};
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getEmployees', () => {
    it('should return employees by cafe', async () => {
      const employeesData = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
      sandbox.stub(employeeService, 'getEmployeesByCafe').resolves(employeesData);
      req.query = { cafe: 'Cafe A' };

      await employeeController.getEmployees(req, res);

      expect(employeeService.getEmployeesByCafe).to.have.been.calledOnceWith('Cafe A');
      expect(res.json).to.have.been.calledOnceWith(employeesData);
    });

    it('should handle service errors', async () => {
      sandbox.stub(employeeService, 'getEmployeesByCafe').throws(new Error('Service Error'));

      await employeeController.getEmployees(req, res);

      expect(res.status).to.have.been.calledOnceWith(500);
      expect(res.json).to.have.been.calledOnceWith({ error: 'Service Error' });
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee and return 201 status', async () => {
      const newEmployee = { name: 'John Doe' };
      sandbox.stub(employeeService, 'createEmployee').resolves(newEmployee);
      req.body = newEmployee;

      await employeeController.createEmployee(req, res);

      expect(employeeService.createEmployee).to.have.been.calledOnceWith(newEmployee);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(newEmployee);
    });

    it('should handle errors when creating an employee', async () => {
      sandbox.stub(employeeService, 'createEmployee').throws(new Error('Service Error'));

      await employeeController.createEmployee(req, res);

      expect(res.status).to.have.been.calledOnceWith(500);
      expect(res.json).to.have.been.calledOnceWith({ error: 'Service Error' });
    });
  });

  // Similar tests for updateEmployee and deleteEmployee...
});
