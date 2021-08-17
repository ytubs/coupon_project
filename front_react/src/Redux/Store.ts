import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { ComRecuder } from "./CompanyState";
import {  CusReducer } from "./CustomerState";
import {  CouReducer } from "./CouponState";


const reducers = combineReducers({  AuthState: authReducer, CompanyState:ComRecuder ,CustomerState:CusReducer, CouponState:CouReducer});
const store = createStore(reducers);

export default store;