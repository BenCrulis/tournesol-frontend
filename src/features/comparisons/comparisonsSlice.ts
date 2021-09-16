import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchComparisons } from './comparisonsAPI';

export interface ComparisonsState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ComparisonsState = {
  value: '',
  status: 'idle',
};

export const getComparisonsAsync = createAsyncThunk(
  'comparisons/fetchComparisons',
  async (access_token: string) => {
    return JSON.stringify(
      (await fetchComparisons(access_token, 0, 30)).results
    );
  }
);

export const comparisonsSlice = createSlice({
  name: 'comparisons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComparisonsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComparisonsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getComparisonsAsync.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const selectComparisons = (state: RootState) => state.comparisons;

export default comparisonsSlice.reducer;
