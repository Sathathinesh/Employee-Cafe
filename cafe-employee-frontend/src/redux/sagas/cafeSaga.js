import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CAFES, setCafes, ADD_CAFE, UPDATE_CAFE, DELETE_CAFE, fetchCafes } from '../actions/cafeActions';
import axios from 'axios';

function* fetchCafesSaga(action) {
  try {
    const response = yield call(axios.get, `/api/cafes?location=${action.payload || ''}`);
    yield put(setCafes(response.data));
  } catch (error) {
    console.error('Fetch Cafes failed', error);
  }
}

function* addCafeSaga(action) {
  try {
    yield call(axios.post, '/api/cafe', action.payload);
    yield put(fetchCafes());
  } catch (error) {
    console.error('Add Cafe failed', error);
  }
}

function* updateCafeSaga(action) {
  try {
    yield call(axios.put, `/api/cafe/${action.payload.id}`, action.payload);
    yield put(fetchCafes());
  } catch (error) {
    console.error('Update Cafe failed', error);
  }
}

function* deleteCafeSaga(action) {
  try {
    yield call(axios.delete, `/api/cafe/${action.payload}`);
    yield put(fetchCafes());
  } catch (error) {
    console.error('Delete Cafe failed', error);
  }
}

export default function* cafeSaga() {
  yield takeLatest(FETCH_CAFES, fetchCafesSaga);
  yield takeLatest(ADD_CAFE, addCafeSaga);
  yield takeLatest(UPDATE_CAFE, updateCafeSaga);
  yield takeLatest(DELETE_CAFE, deleteCafeSaga);
}
