import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  username: '',
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
    setUsername: (state, action) => {
      state.username = action.payload;
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
  setUsername,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenres, // 변경: setGenre -> setGenres로 수정
} = signupSlice.actions;
export const signupaction = {
  nextPage,
  setUsername,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenres, // 변경: setGenre -> setGenres로 수정
};
export default signupSlice.reducer;
