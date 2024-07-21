// src/store/store.ts
"use client"
import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from '../features/coins/coinsSlice';
import numberReducer from '../features/activeCard/activeCardSlice'
import showDropReducer from '../features/ShowDrop/showDrop'
import watchListReducer from '../features/watchList/watchList'
import recentWatchListReducer from '../features/recentList/recentListSlice'
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    number:numberReducer,
    showDrop:showDropReducer,
    watchList:watchListReducer,
    recentList:recentWatchListReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
