package com.book.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.book.model.dto.BookDTO;
import com.book.util.PageInfo;



@Mapper
public interface BookDao {

	int insertBook(BookDTO bookDTO);

	int totalCount(String searchTerm);

	List selectBookList(PageInfo pi);

	int updateStock(Integer id, Integer stockCount);

	int deleteBook(int id);

	BookDTO selectBook(int id);

	int updateBook(BookDTO book);

}
