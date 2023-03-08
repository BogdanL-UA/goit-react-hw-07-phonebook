import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistedReducer from './root-reducer';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
