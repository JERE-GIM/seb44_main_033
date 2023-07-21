import { createSlice } from '@reduxjs/toolkit';

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState: { status: localStorage.getItem('isLogin') === 'true' },
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
