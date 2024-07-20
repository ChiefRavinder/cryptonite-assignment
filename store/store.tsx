// src/store/store.ts
"use client"
import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from '../features/coins/coinsSlice';
import numberReducer from '../features/activeCard/activeCardSlice'
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    number:numberReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
