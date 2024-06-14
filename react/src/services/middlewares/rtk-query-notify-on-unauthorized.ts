import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'sonner';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryNotifyOnUnAuthorized: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const payload = action.payload as object;
    if ('status' in payload && payload.status === 403) {
      toast.error('Unauthorized', {
        description: "You don't have access to this resouce",
        duration: 8000,
      });
    }
  }

  return next(action);
};
