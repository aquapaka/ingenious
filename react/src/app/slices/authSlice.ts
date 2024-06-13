import { createSlice } from '@reduxjs/toolkit';
import { USER_TOKEN_NAME } from '../../const/const';

// initialize userToken from local storage
const userToken = localStorage.getItem(USER_TOKEN_NAME) ? localStorage.getItem(USER_TOKEN_NAME) : null;

interface InitialState {
  userToken: string | null;
}

const initialState: InitialState = {
  userToken: userToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem(USER_TOKEN_NAME, action.payload);
    },
    clearUserToken: (state) => {
      state.userToken = null;
      localStorage.removeItem(USER_TOKEN_NAME);
    },
  },
});

export const { clearUserToken, saveUserToken } = authSlice.actions;

export default authSlice.reducer;
