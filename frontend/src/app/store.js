import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
  task: taskReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["task"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
