const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const cafeController = require('../controllers/cafeController');
const cafeService = require('../services/cafeService');

describe('Cafe Controller', () => {
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

  describe('getCafes', () => {
    it('should return cafes data', async () => {
      const cafesData = [{ name: 'Cafe A' }, { name: 'Cafe B' }];
      sandbox.stub(cafeService, 'getAllCafes').resolves(cafesData);
      req.query = { location: 'city-center' };

      await cafeController.getCafes(req, res);

      expect(cafeService.getAllCafes).to.have.been.calledOnceWith('city-center');
      expect(res.json).to.have.been.calledOnceWith(cafesData);
    });

    it('should handle service errors', async () => {
      sandbox.stub(cafeService, 'getAllCafes').throws(new Error('Service Error'));

      await cafeController.getCafes(req, res);

      expect(res.status).to.have.been.calledOnceWith(500);
      expect(res.json).to.have.been.calledOnceWith({ error: 'Service Error' });
    });
  });

  describe('createCafe', () => {
    it('should create a new cafe and return 201 status', async () => {
      const newCafe = { name: 'Cafe A' };
      sandbox.stub(cafeService, 'createCafe').resolves(newCafe);
      req.body = newCafe;

      await cafeController.createCafe(req, res);

      expect(cafeService.createCafe).to.have.been.calledOnceWith(newCafe);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(newCafe);
    });

    it('should handle errors when creating a cafe', async () => {
      sandbox.stub(cafeService, 'createCafe').throws(new Error('Service Error'));

      await cafeController.createCafe(req, res);

      expect(res.status).to.have.been.calledOnceWith(500);
      expect(res.json).to.have.been.calledOnceWith({ error: 'Service Error' });
    });
  });

  // Similar tests for updateCafe and deleteCafe...
});
