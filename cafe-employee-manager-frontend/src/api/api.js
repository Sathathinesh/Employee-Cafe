
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8088/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cafes API
export const fetchCafes = async (location) => {
  const params = location ? { location } : {};
  const response = await api.get('/cafes', { params });
  return response.data;
};

export const createCafe = async (cafeData) => {
  const formData = new FormData();
  formData.append('name', cafeData.name);
  formData.append('description', cafeData.description);
  formData.append('location', cafeData.location);
  if (cafeData.logo) {
    formData.append('logo', cafeData.logo);
  }
  const response = await api.post('/cafes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCafe = async (id, cafeData) => {
  const formData = new FormData();
  formData.append('name', cafeData.name);
  formData.append('description', cafeData.description);
  formData.append('location', cafeData.location);
  if (cafeData.logo) {
    formData.append('logo', cafeData.logo);
  }
  const response = await api.put(`/cafes/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteCafe = async (id) => {
  await api.delete(`/cafes/${id}`);
};

// Employees API
export const fetchEmployees = async (cafeId) => {
  const params = cafeId ? { cafe: cafeId } : {};
  const response = await api.get('/employees', { params });
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await api.delete(`/employees/${id}`);
};
