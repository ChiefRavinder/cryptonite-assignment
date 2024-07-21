// src/features/recentWatchlist/recentWatchlistSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@/type';  // Make sure this path is correct

interface RecentWatchlistState {
  recentWatchlist: Coin[];
}

const initialState: RecentWatchlistState = {
  recentWatchlist: []
};

const recentWatchlistSlice = createSlice({
  name: 'recentWatchlist',
  initialState,
  reducers: {
    setRecentWatchlist: (state, action: PayloadAction<Coin[]>) => {
      state.recentWatchlist = action.payload;
    },
    addRecentWatchList: (state, action: PayloadAction<Coin>) => {
      state.recentWatchlist.push(action.payload);
    },
    removeRecentWatchList: (state, action: PayloadAction<{ id: string }>) => {
      state.recentWatchlist = state.recentWatchlist.filter(coin => coin.id !== action.payload.id);
    }
  }
});

export const { setRecentWatchlist, addRecentWatchList, removeRecentWatchList } = recentWatchlistSlice.actions;

export default recentWatchlistSlice.reducer;
