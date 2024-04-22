import { put, takeEvery } from "redux-saga/effects";
import { ASYNC_DECREMENT, ASYNC_INCREMENT, decrementCreator, incrementCreator} from "../store/countReducer";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* incrementWorker() {
  yield delay(1000)
  yield put(incrementCreator());
}

export function* decrementWorker() {
 yield delay(2000)
 yield put(decrementCreator())
}

export function* countWatcher() {
  yield takeEvery(ASYNC_INCREMENT, incrementWorker);
  yield takeEvery(ASYNC_DECREMENT, decrementWorker)
}
