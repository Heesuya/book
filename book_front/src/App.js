import { Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Main from "./components/common/Main";
import Login from "./admin/Login";
import BookMain from "./components/book/BookMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/*" element={<BookMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
