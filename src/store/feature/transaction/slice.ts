import {createSlice} from '@reduxjs/toolkit';
import { getBalance, getTransactionHistory, topup, transaction } from './actions';
import { History } from 'types/entites';

export interface TransactionState {
  balance: number | null
  history: {
    offset?: string;
    limit?: string;
    records?: History[];
  }
}

const initialState: TransactionState = {
  balance: null,
  history: {
    limit: '0',
    offset: '0',
    records: [],
  },
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload.data.balance;
      return state;
    });
    builder.addCase(topup.fulfilled, (state, action) => {
      state.balance = action.payload.data.balance;
      return state;
    });
    builder.addCase(transaction.fulfilled, (state, action) => {
      if (state.balance && state.balance > 0) {
        state.balance -= action.payload.data.total_amount;
      }
      return state;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      const history = action.payload.data;
      if (history.offset > 0) {
        state.history.limit = history.limit;
        state.history.offset = history.offset;
        state.history.records = [...state.history.records ?? [], ...history.records];
      } else {
        state.history = history;
      }
      return state;
    });
  },
});

export const {} = transactionSlice.actions;