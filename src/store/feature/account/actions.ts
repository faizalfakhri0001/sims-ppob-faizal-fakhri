import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Settings } from "config";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const user_token = storage.getString('token'); 

export const login = createAsyncThunk(
  'membership/login',
  async (data: {email: string; password: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Settings.base_api_url}/login`, data)
      return response.data

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type Registration = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
export const registration = createAsyncThunk(
  'membership/registration',
  async (data: Registration, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Settings.base_api_url}/registration`, data)
      return response.data

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  'membership/profile',
  async (_data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Settings.base_api_url}/profile`, {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      })
      return response.data

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'membership/update-profile',
  async (user_data: {first_name: string; last_name: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Settings.base_api_url}/profile/update`, user_data, {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      })
      return response.data

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'membership/update-avatar',
  async (avatar_data: any, { rejectWithValue }) => {
    const data = axios.toFormData(avatar_data)

    try {
      const response = await axios.post(`${Settings.base_api_url}/profile/image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          Authorization: `Bearer ${user_token}`
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);