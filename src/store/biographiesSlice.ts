import { createSlice } from "@reduxjs/toolkit";

interface BiographiesState {
  bios: Biography[];
}

const initialState: BiographiesState = {
  bios: [],
};

const biographiesSlice = createSlice({
  name: "biographies",
  initialState,
  reducers: {
    loadBios(state, action) {
      console.log("loadBios");
      state.bios = action.payload;
      console.log(state.bios);
    },
    updateBio(state, action) {
      console.log("updateBio");
      const index = state.bios.findIndex(
        (bio) => bio.uid === action.payload.uid
      );
      state.bios[index] = { ...state.bios[index], ...action.payload };
    },
    deleteBio(state, action) {
      console.log("deleteBio");
      state.bios = state.bios.filter((bio) => bio.uid !== action.payload.uid);
    },
  },
});

export const { loadBios, updateBio, deleteBio } = biographiesSlice.actions;

export default biographiesSlice.reducer;
