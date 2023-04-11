package fr.soumia.BOOKPROJECT.Book;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public  interface BookRepository extends CrudRepository<Book, Integer> {

	
	    List<Book> findByBookStatusAndUserIdNotAndDeletedFalse(BookStatus status, Integer userId);
	    List<Book> findByUserIdAndDeletedFalse(Integer userId);
	    
//	    trouver un livre par partie de son  titre
	    public List<Book> findByTitleIsContaining(String title);
	    
	    @Query(value ="SELECT * FROM `book` b  INNER JOIN category c ON c.id = b.category_id \n"
	    		+" WHERE b.author like %:mot% or b.title like  %:mot%  or c.label like %:mot% "
				, nativeQuery = true)
		public List<Book> findBooksBykey(@Param("mot") String mot);
}
