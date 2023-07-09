import { createSlice } from '@reduxjs/toolkit';

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState: { status: false },
  reducers: {
    login: (state) => {
      state.status = true;
    },
    logout: (state) => {
      state.status = false;
    },
  },
});

export const { login, logout } = isLoginSlice.actions;
export const isLoginAction = { login, logout };
export default isLoginSlice.reducer;
