
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ["tokenData", "isAuthenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,

  },
});

const persistor = persistStore(store);

const reduxStore = { store, persistor };

export default reduxStore;
