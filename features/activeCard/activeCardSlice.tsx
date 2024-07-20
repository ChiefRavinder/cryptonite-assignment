// src/features/number/numberSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NumberState {
  value: number ;
}

const initialState: NumberState = {
  value: -1
};

const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    setNumber: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    }
  }
});

export const { setNumber, increment, decrement } = numberSlice.actions;

export default numberSlice.reducer;
