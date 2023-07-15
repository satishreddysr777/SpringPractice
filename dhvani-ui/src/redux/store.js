import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import auth from "./auth";
import profile from "./profile";
import notification from "./notification";
import pageErrors from "./pageErrorHandler";

const rootReducer = combineReducers({
    auth: auth,
    profile: profile,
    notification: notification,
    pageErrors: pageErrors,
});

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);
