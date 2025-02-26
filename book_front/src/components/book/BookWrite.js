import React, { useState } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import Swal from "sweetalert2"; // SweetAlert2 임포트

const BookWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [searchTitle, setSearchTitle] = useState("");
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    description: "",
    image: "",
  });
  const [bookList, setBookList] = useState([]);

  const handleSearch = async () => {
    if (!searchTitle) {
      Swal.fire({
        icon: "warning",
        title: "검색어 입력",
        text: "책 제목을 입력하세요!",
      });
      return;
    }
    setBookList([]);
    try {
      const response = await axios.get(`${backServer}/api/search-books`, {
        params: { query: searchTitle },
      });
      let bookInfo = response.data;
      console.log(response);
      if (!Array.isArray(bookInfo)) {
        bookInfo = [bookInfo];
      }

      if (bookInfo.length > 0) {
        setBookList(bookInfo); // 책 리스트 저장
        //console.log(bookList);
      } else {
        Swal.fire({
          icon: "info",
          title: "검색 결과 없음",
          text: "검색 결과가 없습니다.",
        });
      }
    } catch (error) {
      //onsole.error("책 검색 실패:", error);
      Swal.fire({
        icon: "error",
        title: "검색 실패",
        text: "서버에 문의해주세요.",
      });
    }
  };

  const handleBookSelect = (book) => {
    setBookData({
      title: book.title,
      author: book.author || "",
      publisher: book.publisher || "",
      description: book.description || "",
      image: book.image || "",
    });
  };

  // 책 정보 업데이트 함수
  const handleUpdateBook = async () => {
    // 입력되지 않은 필드가 있으면 얼럿 띄우기
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.publisher ||
      !bookData.description ||
      !bookData.image
    ) {
      Swal.fire({
        icon: "warning",
        title: "입력되지 않은 정보",
        text: "모든 정보를 입력해주세요!",
      });
      return;
    }
    try {
      // 서버에 책 업데이트 요청
      const response = await axios.post(`${backServer}/api/books`, bookData);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "책 등록 성공",
          text: "책이 성공적으로 업데이트되었습니다.",
        }).then(() => {
          window.location.href = "/"; // 페이지 리다이렉트
        });
      }
    } catch (error) {
      //console.error("책 업데이트 실패:", error);
      Swal.fire({
        icon: "error",
        title: "책 등록 실패",
        text: "서버에 문의해주세요.",
      });
    }
  };

  return (
    <div>
      <div className="page-title">📚 Book Insert</div>
      {/* 책 검색 입력 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="책 정보 가져오기(제목 입력)..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div>
        {bookList.length > 0 && (
          <ul className="book-api-list">
            {bookList.map((book, index) => (
              <li key={index} onClick={() => handleBookSelect(book)}>
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <BookForm bookData={bookData} setBookData={setBookData} />
      <div className="update-button-wrap">
        <button className="update-button" onClick={handleUpdateBook}>
          등록
        </button>
      </div>
    </div>
  );
};

export default BookWrite;
