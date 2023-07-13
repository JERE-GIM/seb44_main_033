import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import isLoginReducer from './reducers/isLogin';
import signupReducer from './reducers/singupSlice';
const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    signup: signupReducer,
  },
});

// custom dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// custom selector
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
