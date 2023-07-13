import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  displayName: '',
  email: '',
  password: '',
  gender: '',
  age: '',
  genre: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      state.currentPage -= 1;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export const {
  nextPage,
  prevPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenre,
} = signupSlice.actions;
export const signupaction = {
  nextPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenre,
};
export default signupSlice.reducer;
