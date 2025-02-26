import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookList: [], // 네이버 검색 결과
    selectedBook: null, // 선택한 책 정보
    status: "idle", // API 상태 관리
  },
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.bookList = action.payload;
        state.status = "succeeded";
      })
      .addCase(searchBooks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
