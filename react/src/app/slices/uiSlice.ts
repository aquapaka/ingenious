import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum Dialogs {
  deleteNote = 'deleteNote',
}

interface InitialState {
  isDirectorySheetOpen: boolean;
  currentDialog: Dialogs | null;
}

const initialState: InitialState = {
  isDirectorySheetOpen: false,
  currentDialog: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDirectorySheetOpen: (state, action: PayloadAction<boolean>) => {
      state.isDirectorySheetOpen = action.payload;
    },
    setDialog: (state, action: PayloadAction<Dialogs>) => {
      state.currentDialog = action.payload;
    },
  },
});

export const { setDirectorySheetOpen, setDialog } = uiSlice.actions;

export default uiSlice.reducer;
