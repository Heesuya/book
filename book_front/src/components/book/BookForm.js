import React from "react";

const BookForm = ({ bookData, setBookData }) => {
  return (
    <div className="form-wrap" style={{ width: "100%" }}>
      {/* 이미지 미리보기 (표지 이미지 맨 위) */}
      {bookData.image && (
        <img
          src={bookData.image}
          alt="책 표지"
          width="100"
          style={{ display: "block", margin: "0 auto" }}
        />
      )}

      {/* 책 정보 입력 폼 (직접 입력 가능) */}
      <div className="book-form">
        <label>제목:</label>
        <input
          type="text"
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
          placeholder="제목을 입력하세요"
        />

        <label>저자:</label>
        <input
          type="text"
          value={bookData.author}
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
          placeholder="저자를 입력하세요"
        />

        <label>출판사:</label>
        <input
          type="text"
          value={bookData.publisher}
          onChange={(e) =>
            setBookData({ ...bookData, publisher: e.target.value })
          }
          placeholder="출판사를 입력하세요"
        />

        <label>설명:</label>
        <textarea
          value={bookData.description}
          onChange={(e) =>
            setBookData({ ...bookData, description: e.target.value })
          }
          placeholder="책 설명을 입력하세요"
        />
      </div>
    </div>
  );
};

export default BookForm;
