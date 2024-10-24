import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  activeSort: {
    name: "популярности",
    fullName: "популярности (сначала популярные)",
    property: "rating",
    order: "desc",
  },
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
})

export const { setActiveCategory, setActiveSort, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer