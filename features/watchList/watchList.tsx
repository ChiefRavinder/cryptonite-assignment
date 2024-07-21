// src/features/watchlist/watchlistSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@/type';  // Make sure this path is correct

interface WatchlistState {
  watchlist: Coin[];
}

const initialState: WatchlistState = {
  watchlist: []
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<Coin[]>) => {
      state.watchlist = action.payload;
    },
    addWatchList: (state, action: PayloadAction<Coin>) => {
      state.watchlist.push(action.payload);
    },
    removeWatchList: (state, action: PayloadAction<{ id: string }>) => {
      state.watchlist = state.watchlist.filter(coin => coin.id !== action.payload.id);
    }
  }
});

export const { setWatchlist, addWatchList, removeWatchList } = watchlistSlice.actions;

export default watchlistSlice.reducer;
