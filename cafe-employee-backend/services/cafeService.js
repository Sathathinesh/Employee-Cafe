const { Cafe, Employee, EmployeeCafe } = require('../models');

const getAllCafes = async (location) => {
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
  return await Cafe.create(data);
};

const updateCafe = async (id, data) => {
  const cafe = await Cafe.findByPk(id);
  if (!cafe) {
    throw new Error('Cafe not found');
  }
  Object.assign(cafe, data);
  await cafe.save();
  return cafe;
};

const deleteCafe = async (id) => {
  const cafe = await Cafe.findByPk(id);
  if (!cafe) {
    throw new Error('Cafe not found');
  }
  await cafe.destroy();
};

module.exports = {
  getAllCafes,
  createCafe,
  updateCafe,
  deleteCafe,
};
