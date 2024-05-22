import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MarkdownEditorState {
  content: string;
}

const initialState: MarkdownEditorState = {
  content: '',
};

export const markdownEditorSlice = createSlice({
  name: 'markdownEditor',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { updateContent } = markdownEditorSlice.actions;

export const markdownEditorReducer = markdownEditorSlice.reducer;
