import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Settings } from "config";
import { MMKV } from "react-native-mmkv";
import { RootState } from "store/index";

const storage = new MMKV();
const user_token = storage.getString('token'); 

export const getBalance = createAsyncThunk(
  'transaction/getBalance',
  async (_data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Settings.base_api_url}/balance`, {
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

export const topup = createAsyncThunk(
  'transaction/topup',
  async (amount: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Settings.base_api_url}/topup`, {"top_up_amount": amount}, {
        headers: {
          Authorization: `Bearer ${user_token}`
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const transaction = createAsyncThunk(
  'transaction/transaction',
  async (service_code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Settings.base_api_url}/transaction`, {"service_code": service_code}, {
        headers: {
          Authorization: `Bearer ${user_token}`
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  'transaction/history',
  async (data: {offset: number; limit:number}, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${Settings.base_api_url}/transaction/history?offset=${data.offset.toString()}&limit=${data.limit.toString()}`, {
        headers: {
          Authorization: `Bearer ${user_token}`
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);