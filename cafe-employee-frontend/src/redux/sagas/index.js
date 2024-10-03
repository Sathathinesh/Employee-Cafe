import { all } from 'redux-saga/effects';
import cafeSaga from './cafeSaga';
import employeeSaga from './employeeSaga';

export default function* rootSaga() {
  yield all([
    cafeSaga(),
    employeeSaga(),
  ]);
}
