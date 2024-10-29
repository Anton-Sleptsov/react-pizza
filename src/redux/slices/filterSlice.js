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
    },
    setFilters: (state, action) => {
      state.activeCategory = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
      state.activeSort = action.payload.sort;
    }
  }
})

export const selectFilters = (state) => state.filter
export const selectActiveSort = (state) => state.filter.activeSort
export const selectActiveCategory = (state) => state.filter.activeCategory

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer