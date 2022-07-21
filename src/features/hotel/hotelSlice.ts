import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import { getHotels } from './hotelThunk';
import { Hotel } from '../../interfaces/hotel';

// declaring the types for our state
export type HotelState = {
  hotels: Array<Hotel>,
  loading: boolean;
  error: boolean;
};

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: false,
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHotels.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHotels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.hotels = payload;
      })
      .addCase(getHotels.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectHotel = (state: RootState) => state.hotel;

export default hotelSlice.reducer;