import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { Hotel } from '../../interfaces/hotel';

export const getHotels = createAsyncThunk('hotel/getHotels', async () => {
  const hotels = await request<Array<Hotel>>('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c');
  return hotels;
});
