import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import { SortableField } from '../../interfaces/hotel';

type Nullable<T> = T | null;

// declaring the types for our state
export type SearchState = {
  fromDate: Nullable<string>,
  toDate: Nullable<string>,
  keyword: Nullable<string>;
  minPrice: number;
  maxPrice: number;
  sortBy: Nullable<SortableField>;
};

export const initialState: SearchState = {
  fromDate: null,
  toDate: null,
  keyword: null,
  minPrice: 0,
  maxPrice: 500,
  sortBy: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      return action.payload;
    },
  },
});

export const selectSearch = (state: RootState) => state.search;

export const {
  setSearch,
} = searchSlice.actions;

export default searchSlice.reducer;