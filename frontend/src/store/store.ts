
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["tokenData","info","isAuthenticated"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,

  },
});

const persistor = persistStore(store);

const reduxStore = { store, persistor };

export default reduxStore;
