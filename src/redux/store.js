import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

  const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, wishlist: wishlistReducer });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);