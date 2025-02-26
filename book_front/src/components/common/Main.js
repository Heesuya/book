import { Route, Router, Routes } from "react-router-dom";
import BookMain from "../book/BookMain";
import BookList from "../book/BookList";

const Main = () => {
  return (
    <section className="section" style={{ width: "100%" }}>
      <div className="book-list">
        <BookList />
      </div>
      <div className="page-title">
        <Routes>
          <Route path="book" element={<BookMain />} />
        </Routes>
      </div>
    </section>
  );
};
export default Main;
