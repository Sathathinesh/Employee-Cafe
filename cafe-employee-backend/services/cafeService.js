const { Cafe, Employee, EmployeeCafe } = require('../models');
const logger = require('../logger');

const getAllCafes = async (location) => {

  logger.info(`Fetching all cafes. Location: ${location || 'all'}`);
  let whereClause = {};
  if (location) {
    whereClause.location = location;
  }

  const cafes = await Cafe.findAll({
    where: whereClause,
    include: [
      {
        model: Employee,
        through: { attributes: [] }
      }
    ]
  });

  logger.info(`Fetched ${cafes.length} cafes.`);
  return cafes.map(cafe => ({
    name: cafe.name,
    description: cafe.description,
    employees: cafe.Employees.length,
    logo: cafe.logo,
    location: cafe.location,
    id: cafe.id,
  })).sort((a, b) => b.employees - a.employees);
};

const createCafe = async (data) => {

  logger.info(`Creating new cafe: ${data.name}`);
  return await Cafe.create(data);
};

const updateCafe = async (id, data) => {

  logger.info(`Updating cafe with id: ${id}`);
  const cafe = await Cafe.findByPk(id);
  if (!cafe) {
    logger.error(`Cafe not found with id: ${id}`);
    throw new Error('Cafe not found');
  }
  Object.assign(cafe, data);
  await cafe.save();
  logger.info(`Updated cafe: ${cafe.name}`);
  return cafe;
};

const deleteCafe = async (id) => {
  
  logger.info(`Deleting cafe with id: ${id}`);
  const cafe = await Cafe.findByPk(id);
  if (!cafe) {
    throw new Error('Cafe not found');
  }
  await cafe.destroy();
  logger.info(`Deleted cafe with id: ${id}`);
};

module.exports = {
  getAllCafes,
  createCafe,
  updateCafe,
  deleteCafe,
};
