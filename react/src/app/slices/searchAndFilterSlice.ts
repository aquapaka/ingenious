import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  searchText: string;
  filterTagIds: string[];
  isFilterOn: boolean;
  isFilterFavoriteOn: boolean;
}

const initialState: InitialState = {
  searchText: '',
  filterTagIds: [],
  isFilterOn: false,
  isFilterFavoriteOn: false,
};

const searchAndFilterSlice = createSlice({
  name: 'searchAndFilter',
  initialState,
  reducers: {
    toggleFilter: (state) => {
      state.isFilterOn = !state.isFilterOn;
    },
    toggleFilterFavorite: (state) => {
      state.isFilterFavoriteOn = !state.isFilterFavoriteOn;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    toggleFilterTagId: (state, action: PayloadAction<string>) => {
      if (state.filterTagIds.includes(action.payload))
        state.filterTagIds = state.filterTagIds.filter((id) => id !== action.payload);
      else state.filterTagIds.push(action.payload);
    },
    clearFilterTagIds: (state) => {
      state.filterTagIds = [];
    },
  },
});

export const { toggleFilter, setSearchText, toggleFilterTagId, toggleFilterFavorite, clearFilterTagIds } = searchAndFilterSlice.actions;

export default searchAndFilterSlice.reducer;
