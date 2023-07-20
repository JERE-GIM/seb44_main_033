import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import isLoginReducer from './reducers/isLogin';
import signupReducer from './reducers/singupSlice';
import modalReducer from './reducers/modal';
import authReducer from './reducers/authSlice';
import tabmovie from './reducers/tabmovieSlice';
import monthly from './reducers/monthlySlice';

const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    signup: signupReducer,
    modal: modalReducer,
    auth: authReducer,
    tabmovie: tabmovie.reducer,
    monthly: monthly.reducer,
  },
});

// custom dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// custom selector
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
