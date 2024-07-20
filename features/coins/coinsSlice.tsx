// src/features/coins/coinsSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@/type';  // Make sure this path is correct

interface CoinsState {
  coins: Coin[];
}

const initialState: CoinsState = {
  coins: []
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    },
    addCoin: (state, action: PayloadAction<Coin>) => {
      state.coins.push(action.payload);
    },
    removeCoin: (state, action: PayloadAction<{ id: string }>) => {
      state.coins = state.coins.filter(coin => coin.id !== action.payload.id);
    }
  }
});

export const { setCoins, addCoin, removeCoin } = coinsSlice.actions;

export default coinsSlice.reducer;
