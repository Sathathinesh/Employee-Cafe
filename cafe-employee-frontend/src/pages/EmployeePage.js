import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTable from '../components/EmployeeTable';
import { fetchEmployees, deleteEmployee } from '../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(state => state.employees.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = id => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      <button onClick={() => navigate('/add-employee')}>Add New Employee</button>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeePage;
