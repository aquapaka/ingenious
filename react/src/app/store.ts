import { mainApi } from '@/services/main-service';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { rtkQueryCheckInvalidCredential } from '../services/middlewares/rtk-query-check-invalid-credential';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware).concat(rtkQueryCheckInvalidCredential),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
