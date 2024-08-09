import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFlights = createAsyncThunk(
  "flights/getFlights",
  async (query: string) => {
    const response = await fetch(
      `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }
    const data = await response.json();
    return data.data;
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flights: [],
    loading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(getFlights.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default flightSlice.reducer;
