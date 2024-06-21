import { mainApi } from '@/services/main-service';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import searchAndFilterReducer from './slices/searchAndFilterSlice';
import { rtkQueryCheckInvalidCredential } from '../services/middlewares/rtk-query-check-invalid-credential';
import { rtkQueryNotifyOnUnAuthorized } from '../services/middlewares/rtk-query-notify-on-unauthorized';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    searchAndFilter: searchAndFilterReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(rtkQueryCheckInvalidCredential)
      .concat(rtkQueryNotifyOnUnAuthorized),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
