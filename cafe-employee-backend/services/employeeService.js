const { Employee, Cafe, EmployeeCafe } = require('../models');

const getEmployeesByCafe = async (cafeName) => {
  const cafeInstance = await Cafe.findOne({ where: { name: cafeName } });
  if (!cafeInstance) {
    return [];
  }

  const employees = await cafeInstance.getEmployees();
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
  const { id, name, email_address, phone_number, gender, cafeName, startDate } = data;
  const newEmployee = await Employee.create({ id, name, email_address, phone_number, gender });

  if (cafeName && startDate) {
    const cafe = await Cafe.findOne({ where: { name: cafeName } });
    if (!cafe) {
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
  const { name, email_address, phone_number, gender, cafeName, startDate } = data;
  const employee = await Employee.findByPk(id);
  if (!employee) {
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

  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    throw new Error('Employee not found');
  }
  await employee.destroy();
};

module.exports = {
  getEmployeesByCafe,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
