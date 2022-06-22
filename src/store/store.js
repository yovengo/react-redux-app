import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {logger} from "./middleware/logger";
import taskReducer from "./task";
import errorReducer from "./errors";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    })
}


export default createStore