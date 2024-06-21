import { createSlice } from '@reduxjs/toolkit';

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
  isFilterFavoriteOn: false
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
    setSearchText: (state, action: { payload: string }) => {
      state.searchText = action.payload;
    },
    addFilterTagId: (state, action: { payload: string }) => {
      if (state.filterTagIds.includes(action.payload)) return;
      state.filterTagIds.push(action.payload);
    },
    removeFilterTagId: (state, action: { payload: string }) => {
      if (!state.filterTagIds.includes(action.payload)) return;
      state.filterTagIds = state.filterTagIds.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleFilter, setSearchText, addFilterTagId, removeFilterTagId, toggleFilterFavorite } = searchAndFilterSlice.actions;

export default searchAndFilterSlice.reducer;
