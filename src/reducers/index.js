import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import toolkitReducer from "./toolkitReducer";
import menuReducer from "./menuReducer";

let reducers = combineReducers({
    kiosks: toolkitReducer,
    menu: menuReducer
})
let store = createStore(reducers,applyMiddleware(thunkMiddleware))
window.store=store

export default store