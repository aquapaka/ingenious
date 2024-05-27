import { Directory, Note } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotesState {
  directories: Directory[];
  nonDirectoryNotes: Note[];
}

const initialState: NotesState = {
  directories: [],
  nonDirectoryNotes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateDirectories: (state, action: PayloadAction<Directory[]>) => {
      state.directories = action.payload;
    },
    updateNonDirectoryNotes: (state, action: PayloadAction<Note[]>) => {
      state.nonDirectoryNotes = action.payload;
    },
  },
});

export const { updateDirectories, updateNonDirectoryNotes } = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
