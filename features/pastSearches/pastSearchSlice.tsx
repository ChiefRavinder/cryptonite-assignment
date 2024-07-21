// src/features/pastSearch/pastSearchSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@/type';  // Make sure this path is correct

interface PastSearchState {
  pastSearch: Coin[];
}

const initialState: PastSearchState = {
  pastSearch: []
};

const pastSearchSlice = createSlice({
  name: 'pastSearch',
  initialState,
  reducers: {
    setPastSearch: (state, action: PayloadAction<Coin[]>) => {
      state.pastSearch = action.payload;
    },
    addPastSearch: (state, action: PayloadAction<Coin>) => {
      // If the list already has 4 items, remove the oldest item
      if (state.pastSearch.length >= 4) {
        state.pastSearch.shift();
      }
      state.pastSearch.push(action.payload);
    },
    removePastSearch: (state, action: PayloadAction<{ id: string }>) => {
      state.pastSearch = state.pastSearch.filter(coin => coin.id !== action.payload.id);
    }
  }
});

export const { setPastSearch, addPastSearch, removePastSearch } = pastSearchSlice.actions;

export default pastSearchSlice.reducer;
