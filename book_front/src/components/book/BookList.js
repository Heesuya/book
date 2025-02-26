import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookUpdate from "./BookWrite";
import "./book.css";
import axios from "axios";
import PageNavi from "./PageNavi";
import Swal from "sweetalert2";

const BookList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bookList, setBookList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  // 검색어가 변경될 때마다 호출되는 useEffect
  useEffect(() => {
    setBookList([]);
    axios
      .get(`${backServer}/api/books`, { params: { page: reqPage, searchTerm } }) // 검색어 추가된 파라미터
      .then((res) => {
        setBookList(res.data.list); // 목록
        setPi(res.data.pi); // 페이징
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [reqPage, searchTerm]); // 검색어와 페이지가 바뀔 때마다 호출

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  return (
    <section className="list-wrap" style={{ width: "100%" }}>
      <div className="page-title">Book List</div>

      {/* 검색바 */}
      <div className="search-wrap">
        <div className="search-bar">
          <input
            type="text"
            placeholder="제목 또는 저자 검색"
            value={searchTerm}
            onChange={handleSearchChange} // 검색어 입력 변경 처리
          />
        </div>
        <div className="write-wrap">
          <Link to="/book/write" className="btn-primary">
            책등록
          </Link>
        </div>
      </div>

      <div className="book-list-wrap">
        <ul className="list-wrap">
          {bookList.map((book, i) => {
            return <BookItem key={i} book={book} setBookList={setBookList} />;
          })}
        </ul>
      </div>

      <div className="board-paging-warp">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </section>
  );
};

const BookItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const book = props.book;
  const navigate = useNavigate();
  const { setBookList } = props;

  const [stockCount, setStockCount] = useState(book.salesCount); // 재고 상태 추가

  // 재고 수정 함수
  const handleStockChange = () => {
    if (stockCount < 0) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: "재고는 0 이상이어야 합니다.",
      });
      return;
    }

    axios
      .put(`${backServer}/api/books/${book.id}/update/${stockCount}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "재고가 성공적으로 업데이트되었습니다.",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "오류",
          text: "재고 업데이트 중 오류가 발생했습니다.",
        });
      });
  };

  // 책 삭제 함수
  const handleDelete = () => {
    Swal.fire({
      title: `${book.title} 책을 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/api/books/${book.id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "삭제 성공",
              text: `${book.title} 책이 삭제되었습니다.`,
            });

            // 책이 삭제되면 현재 목록에서 해당 책을 제거
            setBookList((prevList) =>
              prevList.filter((item) => item.id !== book.id)
            );
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "오류",
              text: "책 삭제 중 오류 발생",
            });
          });
      }
    });
  };
  return (
    <li className="posting-item">
      <div className="posting-img">
        <img
          src={book.image ? book.image : "/image/default_img.png"}
          alt={book.title}
          onClick={() => {
            navigate(`/book/view/${book.id}`);
          }}
        />
      </div>
      <div className="posting-info">
        <div className="posting-title">{book.title}</div>
        <div className="posting-sub-info">
          <span>저자 : {book.author}</span>
          <span>출판사 : {book.publisher}</span>
          <span>판매 : {book.salesCount}</span>
          <span>
            재고 :
            <input
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(parseInt(e.target.value))}
              min="0"
            />
            <button className="btn-list" onClick={handleStockChange}>
              수정
            </button>
          </span>
        </div>
      </div>
      <div className="delete-book">
        <button className="btn-list" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </li>
  );
};

export default BookList;
