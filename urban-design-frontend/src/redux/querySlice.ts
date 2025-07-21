import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// querySlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQueryFilter = createAsyncThunk(
  'query/fetchFilter',
  async (query: string) => {

    const BACKEND_URL = "http://localhost:5000";
    const res = await fetch(`${BACKEND_URL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log("data",data)
    return { query, filter:data.filter };
  }
);


interface Filter {
  attribute: string;
  operator: string;
  value: any;
}

interface QueryState {
  lastQuery: string;
  lastFilter: Filter | null;
}

const initialState: QueryState = {
  lastQuery: '',
  lastFilter: null,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQueryAndFilter: (
      state,
      action: PayloadAction<{ query: string; filter: Filter }>
    ) => {
      state.lastQuery = action.payload.query;
      state.lastFilter = action.payload.filter;
    },
    resetQuery: (state) => {
      state.lastQuery = '';
      state.lastFilter = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQueryFilter.fulfilled, (state, action) => {
      state.lastQuery = action.payload.query;
      state.lastFilter = action.payload.filter;
    });
  }
});

export const { setQueryAndFilter, resetQuery } = querySlice.actions;
export default querySlice.reducer;
