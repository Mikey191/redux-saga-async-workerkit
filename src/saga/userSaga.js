import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_USERS, setUsers } from "../store/userReducer";

const fetchUsersFromApi = () =>
  fetch("https://jsonplaceholder.typicode.com/users/");

export function* fetchUserWorker() {
  const data = yield call(fetchUsersFromApi);
  console.log(data);
  const json = yield call(() => new Promise((res) => res(data.json())));
  console.log(json);
  yield put(setUsers(json));
}

export function* userWatcher() {
  yield takeEvery(FETCH_USERS, fetchUserWorker);
}
