import { createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { firebaseStorage } from "../firebase";

const DB_URI = process.env.REACT_APP_DB_URI as string;

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
    _addBio(state, action) {
      console.log("addBio");
      state.bios.push(state.bios[0]);
    },
    _updateBio(state, action) {
      console.log("updateBio");
      const index = state.bios.findIndex((bio) => bio.id === action.payload.id);
      state.bios[index] = { ...state.bios[index], ...action.payload };
    },
    _deleteBio(state, action) {
      console.log("deleteBio");
      state.bios = state.bios.filter((bio) => bio.id !== action.payload.id);
    },
  },
});

export const fetchBios = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/biographies`);
      if (response.ok) {
        const bios = await response.json();
        dispatch(loadBios(bios));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error fetching biographies: " + error);
    }
  };
};

export const addBio = (bio: Biography) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/biographies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bio),
      });
      if (response.ok) {
        const newBio = await response.json();
        dispatch(_addBio(newBio));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error adding bio: " + error);
    }
  };
};

type UpdateBioPayload = {
  bioId: string;
  newBio: Partial<Biography>;
  avatar: Blob | null; // if in edit and image uploaded, type is Blob. if in edit and image not uploaded (same image), it is null.
};
export const updateBio = ({ bioId, newBio, avatar }: UpdateBioPayload) => {
  return async (dispatch: any) => {
    const imageId = uuidv4();
    const imageRef = ref(firebaseStorage, `profile-photos/${imageId}`);
    try {
      if (avatar) {
        // upload the new image and get url to set bio.avatar
        await uploadBytes(imageRef, avatar);
        newBio.avatarUrl = await getDownloadURL(imageRef);
        // // delete old image from db if editing, an image uploaded, and an old image exists
        // implement delete old image from db
      }

      const response = await fetch(`${DB_URI}/biographies/${bioId}`, {
        method: "PATCH",
        body: JSON.stringify(newBio),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) dispatch(_updateBio(newBio));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error updating biography: " + error);
    }
  };
};

export const deleteBio = (bio: Biography) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/biographies/${bio.id}`, {
        method: "DELETE",
      });
      if (response.ok) dispatch(_deleteBio(bio));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error deleting biography: " + error);
    }
  };
};

export const { loadBios, _addBio, _updateBio, _deleteBio } =
  biographiesSlice.actions;

export default biographiesSlice.reducer;
