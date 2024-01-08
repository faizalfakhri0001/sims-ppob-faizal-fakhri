import {createSlice} from '@reduxjs/toolkit';
import { Banner, Service } from 'types/entites';
import { getBanners, getServices } from './actions';

export interface InformationState {
  banner: Banner[];
  services: Service[];
}

const initialState: InformationState = {
  banner: [],
  services: [],
};

export const informationSlice = createSlice({
  name: 'information',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.banner = action.payload.data;
      return state;
    })
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload.data;
      return state;
    })
  },
});

export const {} = informationSlice.actions;