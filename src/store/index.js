import { applyMiddleware, combineReducers, createStore } from "redux";
import countReducer from "./countReducer";
import userReducer from "./userReducer";
import { rootWatcher } from "../saga";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  countReducer,
  userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
