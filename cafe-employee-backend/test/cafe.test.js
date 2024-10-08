const cafeController = require('../controllers/cafeController');
const cafeService = require('../services/cafeService');

// Mock the cafeService module
jest.mock('../services/cafeService');

describe('Cafe Controller', () => {
  let req, res;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock request and response objects
    req = {
      query: {},
      params: {}, // Added to ensure params is initialized properly
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('getCafes', () => {
    it('should return cafes data', async () => {
      const cafesData = [
        { name: 'Cafe A', description: 'Desc A', employees: 2, logo: 'logoA', location: 'Loc A', id: 1 },
        { name: 'Cafe B', description: 'Desc B', employees: 1, logo: 'logoB', location: 'Loc B', id: 2 },
      ];

      // Mock the getAllCafes method to resolve with cafesData
      cafeService.getAllCafes.mockResolvedValue(cafesData);
      req.query.location = 'city-center';

      await cafeController.getCafes(req, res);

      expect(cafeService.getAllCafes).toHaveBeenCalledTimes(1);
      expect(cafeService.getAllCafes).toHaveBeenCalledWith('city-center');
      expect(res.json).toHaveBeenCalledWith(cafesData);
    });

    it('should handle service errors', async () => {
      // Mock the getAllCafes method to reject with an error
      cafeService.getAllCafes.mockRejectedValue(new Error('Service Error'));

      await cafeController.getCafes(req, res);

      expect(cafeService.getAllCafes).toHaveBeenCalledTimes(1);
      expect(cafeService.getAllCafes).toHaveBeenCalledWith(undefined);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
  });

  describe('createCafe', () => {
    it('should create a new cafe and return 201 status', async () => {
      const newCafe = { name: 'Cafe C', description: 'Desc C', location: 'Loc C', logo: 'logoC' };

      // Mock the createCafe method to resolve with newCafe
      cafeService.createCafe.mockResolvedValue(newCafe);
      req.body = newCafe;

      await cafeController.createCafe(req, res);

      expect(cafeService.createCafe).toHaveBeenCalledTimes(1);
      expect(cafeService.createCafe).toHaveBeenCalledWith(newCafe);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newCafe);
    });

    it('should handle errors when creating a cafe', async () => {
      // Mock the createCafe method to reject with an error
      cafeService.createCafe.mockRejectedValue(new Error('Service Error'));
      req.body = { name: 'Cafe D' };

      await cafeController.createCafe(req, res);

      expect(cafeService.createCafe).toHaveBeenCalledTimes(1);
      expect(cafeService.createCafe).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service Error' });
    });
  });

  
});
