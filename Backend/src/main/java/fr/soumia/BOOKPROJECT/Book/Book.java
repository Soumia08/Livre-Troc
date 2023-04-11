package fr.soumia.BOOKPROJECT.Book;
import java.util.ArrayList;
import java.util.List;

//
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import fr.soumia.BOOKPROJECT.user.UserInfo;


@Entity
public class Book {
	
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotBlank
    private String title;
	
	
	@ManyToOne
    private Category category;
	
	private BookStatus bookStatus;
	
	private String picUrl;
	
	
	 @ManyToOne
	 private UserInfo user;
//
//	 
	 @Transient
	 private int categoryId;

	
	private boolean deleted;

	 private String author ;
	
	
	private Language language;
	
	
	private BookEtat bookEtat;
	
	private String description;
//	 
    public boolean isDeleted() {
		return deleted;
	}
//
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
//
    public int getId() {
		return id;
	}
//
	public void setId(int id) {
		this.id = id;
	}
//
	public UserInfo getUser() {
		return user;
	}
//
	public void setUser(UserInfo user) {
		this.user = user;
	}
//
	public int getCategoryId() {
		return categoryId;
	}
//
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
//
	public BookStatus getBookStatus() {
        return bookStatus;
    }
//
    public void setBookStatus(BookStatus bookStatus) {
        this.bookStatus = bookStatus;
    }
    public String getTitle() {
        return title;
    }
//
    public void setTitle(String title) {
        this.title = title;
    }
//
    public Category getCategory() {
        return category;
    }
//
    public void setCategory(Category category) {
        this.category = category;
    }
    
	public Language getLanguage() {
		return language;
	}
	public void setLanguage(Language language) {
		this.language = language;
	}
	public BookEtat getBookEtat() {
		return bookEtat;
	}
	public void setBookEtat(BookEtat bookEtat) {
		this.bookEtat = bookEtat;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPicUrl() {
		return picUrl;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	
	
	
	
}