import { createStore, combineReducers } from "redux";
import sidebar from "./sidebar";

const rootReducer = combineReducers({ sidebar });

const initialState = {};

const store = () => createStore(rootReducer, initialState);
export default store;
