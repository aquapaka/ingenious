import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isDirectorySheetOpen: boolean;
}

const initialState: InitialState = {
  isDirectorySheetOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDirectorySheetOpen: (state, action: { payload: boolean }) => {
      state.isDirectorySheetOpen = action.payload;
    },
  },
});

export const { setDirectorySheetOpen } = uiSlice.actions;

export default uiSlice.reducer;
