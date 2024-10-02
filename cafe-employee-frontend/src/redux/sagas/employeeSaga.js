import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_EMPLOYEES, setEmployees, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, fetchEmployees } from '../actions/employeeActions';
import axios from 'axios';

function* fetchEmployeesSaga(action) {
  try {
    const response = yield call(axios.get, `/api/employees?cafe=${action.payload || ''}`);
    yield put(setEmployees(response.data));
  } catch (error) {
    console.error('Fetch Employees failed', error);
  }
}

function* addEmployeeSaga(action) {
  try {
    yield call(axios.post, '/api/employee', action.payload);
    yield put(fetchEmployees());
  } catch (error) {
    console.error('Add Employee failed', error);
  }
}

function* updateEmployeeSaga(action) {
  try {
    yield call(axios.put, `/api/employee/${action.payload.id}`, action.payload);
    yield put(fetchEmployees());
  } catch (error) {
    console.error('Update Employee failed', error);
  }
}

function* deleteEmployeeSaga(action) {
  try {
    yield call(axios.delete, `/api/employee/${action.payload}`);
    yield put(fetchEmployees());
  } catch (error) {
    console.error('Delete Employee failed', error);
  }
}

export default function* employeeSaga() {
  yield takeLatest(FETCH_EMPLOYEES, fetchEmployeesSaga);
  yield takeLatest(ADD_EMPLOYEE, addEmployeeSaga);
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployeeSaga);
}
