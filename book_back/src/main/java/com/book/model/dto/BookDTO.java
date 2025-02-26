package com.book.model.dto;

import java.util.List;
import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "book")
public class BookDTO {
	private Long id;
	private String title;
	private String author;
    private String publisher;
	private String description;
	private String image;
	private int stockCount;   
    private int salesCount;

}
