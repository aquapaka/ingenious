import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { clearUserToken } from '../../app/slices/authSlice';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryToast: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    if ('status' in action.payload && action.payload.status === 401) {
      toast.error('Your credentials has expired', {
        description: 'Please re-login',
      });
      api.dispatch(clearUserToken());
    }
  }

  return next(action);
};
