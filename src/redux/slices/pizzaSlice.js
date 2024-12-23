import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "loading"
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ page, category, sort, order, search, methodName }) => {
    const { data } = await axios
      .get(
        `http://localhost:5027/pizza/${methodName}?${page}&sortBy=${sort}&order=${order}${category}${search}`
        //`https://6712c3d46c5f5ced662497c0.mockapi.io/items?${page}&sortBy=${sort}&order=${order}${category}${search}`
      );

    return data
  },
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  }
})

export const selectPizzaData = (state) => state.pizza

export default pizzaSlice.reducer