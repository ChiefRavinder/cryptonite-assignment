// src/features/showDrop/showDropSlice.ts
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowDropState {
  showDrop: boolean;
}

const initialState: ShowDropState = {
  showDrop: false,
};

const showDropSlice = createSlice({
  name: "showDrop",
  initialState,
  reducers: {
    toggleShowDrop: (state) => {
      state.showDrop = !state.showDrop;
    },
    setShowDrop: (state, action: PayloadAction<boolean>) => {
      state.showDrop = action.payload;
    },
  },
});

export const { toggleShowDrop, setShowDrop } = showDropSlice.actions;

export default showDropSlice.reducer;
