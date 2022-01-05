import { createSlice } from "@reduxjs/toolkit";

const initialState: ContactInfo = {
  address: "",
  phone: "",
  email: "",
  weekdayHours: "",
  saturdayHours: "",
  sundayHours: "",
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState,
  reducers: {
    updateContactInfo(state, action) {
      console.log("updateContactInfo");
      state = { ...state, ...action.payload };
    },
  },
});

export const { updateContactInfo } = contactInfoSlice.actions;

export default contactInfoSlice.reducer;
