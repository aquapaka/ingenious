import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { clearUserToken } from '../../app/slices/authSlice';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryCheckInvalidCredential: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const payload = action.payload as object;
    if ('status' in payload && payload.status === 401) {
      api.dispatch(clearUserToken());
    }
  }

  return next(action);
};
