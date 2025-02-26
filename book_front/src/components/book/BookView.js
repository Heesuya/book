import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BookView = () => {
  const { bookId } = useParams();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backServer}/api/books/${bookId}`)
      .then((res) => {
        setBook(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "책 정보 불러오기 실패",
          text: "서버에 문의 해주세요.",
        });
        //console.error("책 상세 정보 불러오기 실패", err);
      });
  }, [bookId]);

  if (!book) return <p>로딩 중...</p>;

  return (
    <div className="book-view-container">
      <div className="book-header">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author">저자: {book.author}</p>
        <p className="book-publisher">출판사: {book.publisher}</p>
      </div>

      <div className="book-image">
        <img
          src={book.image ? book.image : "/image/default_img.png"}
          alt={book.title}
        />
      </div>

      <div className="book-description">
        <h3>책 소개</h3>
        <p>{book.description}</p>
      </div>
      <div className="btn-wrap">
        <button
          className="btn-secondary btn-wrap-btn"
          onClick={() => navigate(`/book/update/${book.id}`)} // 수정 페이지로 이동
        >
          수정하기
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            Swal.fire({
              icon: "warning",
              title: "돌아가기",
              text: "돌아가시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "예",
              cancelButtonText: "취소",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`/`);
              }
            });
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default BookView;
