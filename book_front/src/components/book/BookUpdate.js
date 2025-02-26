import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookForm from "./BookForm";
import Swal from "sweetalert2";

const BookUpdate = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // 책 정보 가져오기
    axios
      .get(`${backServer}/api/books/${bookId}`)
      .then((res) => {
        setBookData(res.data); // 서버에서 가져온 책 데이터를 state에 저장
        console.log(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "책 정보 불러오기 실패",
          text: "서버에 문의 해주세요.",
        });
        //console.error("책 정보 불러오기 실패", err);
      });
  }, [bookId]);

  const handleSave = () => {
    // 서버에 수정된 책 데이터 전송
    axios
      .put(`${backServer}/api/books/${bookId}`, bookData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "책 정보가 성공적으로 수정되었습니다.",
        });
        navigate(`/book/view/${bookId}`); // 수정 후 책 상세 페이지로 이동
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "수정 실패",
          text: "서버에 문의해주세요.",
        });
        //console.error("책 정보 수정 실패", err);
      });
  };

  return (
    <div className="book-update-container">
      <h1>책 수정하기</h1>
      <BookForm
        bookData={bookData}
        setBookData={setBookData} // 수정된 데이터를 상위 컴포넌트로 전달
      />
      <div className="btn-wrap">
        <button className="btn-secondary" onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default BookUpdate;
