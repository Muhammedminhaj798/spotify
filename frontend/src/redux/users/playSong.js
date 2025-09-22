import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  loading: false,
  error: null,
};

const playSongSlice = createSlice({
  name: "playSong",
  initialState,
  reducers: {
    playSongRequest(state, action) {
      state.id = action.payload;
    },
  },
});

export default playSongSlice.reducer;
export const { playSongRequest } = playSongSlice.actions;
