import { createSlice } from "@reduxjs/toolkit";

const DB_URI = process.env.REACT_APP_DB_URI as string;

interface ContactInfoState {
  contactInfo: ContactInfo;
}

const initialState: ContactInfoState = {
  contactInfo: {
    address: "",
    email: "",
    phone: "",
    weekdayHours: "",
    saturdayHours: "",
    sundayHours: "",
  },
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState,
  reducers: {
    loadContactInfo(state, action) {
      console.log("loadContactInfo");
      state.contactInfo = action.payload;
    },
    _updateContactInfo(state, action) {
      console.log("updateContactInfo");
      state.contactInfo = { ...state.contactInfo, ...action.payload };
    },
  },
});

export const fetchContactInfo = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/contactInfo`);
      if (response.ok) {
        const contactInfo = await response.json();
        await dispatch(loadContactInfo(contactInfo));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error fetching contact info: " + error);
    }
  };
};

export const updateContactInfo = (contactInfo: ContactInfo) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/contactInfo`, {
        method: "PUT",
        body: JSON.stringify(contactInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) dispatch(_updateContactInfo(contactInfo));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error updating contact info: " + error);
    }
  };
};

export const { loadContactInfo, _updateContactInfo } = contactInfoSlice.actions;

export default contactInfoSlice.reducer;
