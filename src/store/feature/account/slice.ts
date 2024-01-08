import {createSlice} from '@reduxjs/toolkit';
import { getProfile, login, updateAvatar, updateProfile } from './actions';
import { MMKV } from 'react-native-mmkv'
import { Profile } from 'types/entites';

const storage = new MMKV()

export interface AccountState {
  token: string
  isLogin: boolean;
  user_profile: Profile | null;
}

const initialState: AccountState = {
  token: '',
  isLogin: false,
  user_profile: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.token = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogin = true;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.data.token;
      state.isLogin = true;
      storage.set('token', action.payload.data.token)
      return state;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user_profile = action.payload.data;
      return state;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user_profile = action.payload.data;
      return state;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.user_profile = action.payload.data;
      return state;
    });
  },
});

export const {logout, setToken} = accountSlice.actions;