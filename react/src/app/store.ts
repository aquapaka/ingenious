import { markdownEditorReducer } from '@/features/markdown-editor/markdownEditorSlice';
import { notesReducer } from '@/features/notes/notesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    markdownEditorReducer,
    notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
