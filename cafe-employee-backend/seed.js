const { Employee, Cafe, EmployeeCafe } = require('./models');

async function seedDatabase() {
   await Employee.bulkCreate([
    { id: 'UI1234567', name: 'John Doe', email_address: 'john@example.com', phone_number: '91234567', gender: 'Male' },
     { id: 'UI2345678', name: 'Jane Doe', email_address: 'jane@example.com', phone_number: '82345678', gender: 'Female' },
   ]);

  const cafe1 = await Cafe.create({ id: 'CA1234560', name: 'Cafe 1', description: 'First cafe', location: 'Location 1' });
  const cafe2 = await Cafe.create({ id: 'CA1234561', name: 'Cafe 2', description: 'Second cafe', location: 'Location 2' });

  await EmployeeCafe.create({ EmployeeId: 'UI1234567', CafeId: 'CA1234560', start_date: new Date() });
  await EmployeeCafe.create({ EmployeeId: 'UI2345678', CafeId: 'CA1234561', start_date: new Date() });

  console.log('Database seeded successfully');
  process.exit();
}

seedDatabase();
