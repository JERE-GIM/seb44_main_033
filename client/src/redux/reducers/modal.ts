import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum MODAL_ROLE {
  REVIEW_WRITE = 'reviewWrite',
  REVIEW_DELETE = 'reviewDelete',
  USER_INFO_EDIT = 'userInfoEdit',
  ACCOUNT_DELETE = 'accountDelete',
  PROFILE_UPLOAD = 'uploadProfile',
}

interface IInitialState {
  status: boolean;
  role:
    | MODAL_ROLE.REVIEW_WRITE
    | MODAL_ROLE.REVIEW_DELETE
    | MODAL_ROLE.USER_INFO_EDIT
    | MODAL_ROLE.ACCOUNT_DELETE
    | MODAL_ROLE.PROFILE_UPLOAD
    | null;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: { status: false, role: null } as IInitialState,
  reducers: {
    open: (state, action: PayloadAction<MODAL_ROLE>) => {
      state.status = true;
      state.role = action.payload;
    },
    close: (state) => {
      state.status = false;
      state.role = null;
    },
  },
});

const { open, close } = modalSlice.actions;
export const modalAction = { open, close };

export default modalSlice.reducer;
