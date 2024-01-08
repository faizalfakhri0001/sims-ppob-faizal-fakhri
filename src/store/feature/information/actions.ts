import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Settings } from "config";
import { MMKV } from "react-native-mmkv";
import { container } from "services";
import { TYPES } from "src/services/TYPES";
import { InformationServiceInterface } from "src/services/interface";

const storage = new MMKV();
const user_token = storage.getString('token'); 

export const getBanners = createAsyncThunk(
  'information/getBanners',
  async (_data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Settings.base_api_url}/banner`, {
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

export const getServices = createAsyncThunk(
  'information/getServices',
  async (_data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Settings.base_api_url}/services`, {
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