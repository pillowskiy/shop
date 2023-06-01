import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/user.slice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import {cartMiddleware} from "@redux/cart/cart.middleware";
import {cartSlice} from "@redux/cart/cart.slice";

const persistConfig = {
  key: 'root',
  whitelist: ['cart'],
  storage,
}
const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(cartMiddleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;