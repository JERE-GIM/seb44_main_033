import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  displayName: '',
  email: '',
  password: '',
  gender: '',
  age: '',
  genres: [], // 변경: genre -> genres로 수정
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
    setGenres: (state, action) => {
      state.genres = action.payload; // 변경: setGenre -> setGenres로 수정
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
  setGenres, // 변경: setGenre -> setGenres로 수정
} = signupSlice.actions;
export const signupaction = {
  nextPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenres, // 변경: setGenre -> setGenres로 수정
};
export default signupSlice.reducer;
