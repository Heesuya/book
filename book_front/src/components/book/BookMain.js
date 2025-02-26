import React from "react";
import { Route, Routes } from "react-router-dom";
import BookView from "./BookView";
import BookWrite from "./BookWrite";
import BookUpdate from "./BookUpdate.js";

const BookMain = () => {
  return (
    <section className="section" style={{ width: "100%" }}>
      <Routes>
        <Route path="view/:bookId" element={<BookView />} />
        <Route path="write" element={<BookWrite />} />
        <Route path="update/:bookId" element={<BookUpdate />} />
      </Routes>
    </section>
  );
};

export default BookMain;
