import { markdownEditorReducer } from '@/features/markdown-editor/markdownEditorSlice';
import { notesReducer } from '@/features/notes/notesSlice';
import { mainApi } from '@/services/main-service';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    markdownEditorReducer,
    notesReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
