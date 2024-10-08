const { Employee, Cafe, EmployeeCafe } = require('../models');
const logger = require('../logger');

const getEmployeesByCafe = async (cafeName) => {
  
  if (!cafeName) {
    logger.info(`Cafe name is not provided, fetching all employees`);

    // Fetch all employees if no specific cafe is provided
    const allEmployees = await Employee.findAll();
    logger.info(`Fetched ${allEmployees.length} employees`);

    return allEmployees.map(employee => {
      const startDate = employee.EmployeeCafe?.start_date || new Date();
      const daysWorked = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));

      return {
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        days_worked: daysWorked,
        cafe: employee.EmployeeCafe?.Cafe?.name || 'No Cafe Assigned',
      };
    }).sort((a, b) => b.days_worked - a.days_worked);
  }

  logger.info(`Fetching employees for cafe: ${cafeName}`);
  const cafeInstance = await Cafe.findOne({ where: { name: cafeName } });
  if (!cafeInstance) {
    logger.error(`Cafe not found: ${cafeName}`);
    return [];
  }

  const employees = await cafeInstance.getEmployees();
  logger.info(`Fetched ${employees.length} employees for cafe: ${cafeName}`);
  return employees.map(employee => {
    const startDate = employee.EmployeeCafe.start_date;
    const daysWorked = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));

    return {
      id: employee.id,
      name: employee.name,
      email_address: employee.email_address,
      phone_number: employee.phone_number,
      days_worked: daysWorked,
      cafe: cafeInstance.name,
    };
  }).sort((a, b) => b.days_worked - a.days_worked);
};

const createEmployee = async (data) => {
  logger.info(`Creating new employee: ${data.name}`);
  const { id, name, email_address, phone_number, gender, cafeName, startDate } = data;
  const newEmployee = await Employee.create({ id, name, email_address, phone_number, gender });

  if (cafeName && startDate) {
    const cafe = await Cafe.findOne({ where: { name: cafeName } });
    if (!cafe) {
      logger.error(`Cafe not found for employee: ${data.name}`);
      throw new Error('Cafe not found');
    }

    await EmployeeCafe.create({
      EmployeeId: newEmployee.id,
      CafeId: cafe.id,
      start_date: startDate,
    });
  }

  return newEmployee;
};

const updateEmployee = async (id, data) => {
  logger.info(`Updating employee with id: ${id}`);
  const { name, email_address, phone_number, gender, cafeName, startDate } = data;
  const employee = await Employee.findByPk(id);
  if (!employee) {
    logger.error(`Cafe not found for employee: ${employee.name}`);
    throw new Error('Employee not found');
  }

  Object.assign(employee, { name, email_address, phone_number, gender });
  await employee.save();

  if (cafeName && startDate) {
    const cafe = await Cafe.findOne({ where: { name: cafeName } });
    if (!cafe) {
      throw new Error('Cafe not found');
    }

    const employeeCafe = await EmployeeCafe.findOne({ where: { EmployeeId: employee.id } });
    if (employeeCafe) {
      employeeCafe.CafeId = cafe.id;
      employeeCafe.start_date = startDate;
      await employeeCafe.save();
    } else {
      await EmployeeCafe.create({
        EmployeeId: employee.id,
        CafeId: cafe.id,
        start_date: startDate,
      });
    }
  }
  logger.info(`Updated employee: ${employee.name}`);
  return employee;
};

const deleteEmployee = async (id) => {
  logger.info(`Deleting employee with id: ${id}`);
  const employee = await Employee.findByPk(id);
  if (!employee) {
    logger.error(`Employee not found with id: ${id}`);
    throw new Error('Employee not found');
  }
  await employee.destroy();
  logger.info(`Deleted employee with id: ${id}`);
};

module.exports = {
  getEmployeesByCafe,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
