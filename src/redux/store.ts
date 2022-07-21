import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers
} from '@reduxjs/toolkit';

import type { PreloadedState } from '@reduxjs/toolkit';

import hotelReducer from '@app/features/hotel/hotelSlice';
import searchReducer from '@app/features/hotel/searchSlice';

const rootReducer = combineReducers({
  hotel: hotelReducer,
  search: searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
