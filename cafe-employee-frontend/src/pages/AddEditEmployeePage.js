import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, fetchEmployees } from '../redux/actions/employeeActions';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditEmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const employees = useSelector(state => state.employees.employees);
  const cafes = useSelector(state => state.cafes.cafes);
  const [employee, setEmployee] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: '',
    cafe: '',
  });

  useEffect(() => {
    if (id) {
      const selectedEmployee = employees.find(emp => emp.id === id);
      if (selectedEmployee) {
        setEmployee(selectedEmployee);
      }
    }
  }, [id, employees]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      dispatch(updateEmployee(employee));
    } else {
      dispatch(addEmployee(employee));
    }
    navigate('/employees');
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            minLength="6"
            maxLength="10"
          />
        </div>
        <div>
          <label>Email address:</label>
          <input
            type="email"
            name="email_address"
            value={employee.email_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone number:</label>
          <input
            type="text"
            name="phone_number"
            value={employee.phone_number}
            onChange={handleChange}
            required
            pattern="^[89]\d{7}$"
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={employee.gender === 'male'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={employee.gender === 'female'}
            onChange={handleChange}
          /> Female
        </div>
        <div>
          <label>Assigned Cafe:</label>
          <select name="cafe" value={employee.cafe} onChange={handleChange}>
            <option value="">Select a cafe</option>
            {cafes.map(cafe => (
              <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEditEmployeePage;
