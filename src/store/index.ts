import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import { accountSlice } from './feature/account/slice';
import { transactionSlice } from './feature/transaction/slice';
import { informationSlice } from './feature/information/slice';

const combinedReducer = combineReducers({
    account: accountSlice.reducer,
    transaction: transactionSlice.reducer,
    home: informationSlice.reducer,
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      // thunk: {
      //   extraArgument: {
      //     // Pass your services or dependencies here
      //     membershipService: container.get<MembershipServiceInterface>(TYPES.MembershipServiceInterface),
      //     informationService: container.get<InformationServiceInterface>(TYPES.InformationServiceInterface),
      //   } as { membershipService: MembershipServiceInterface },
      // },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;