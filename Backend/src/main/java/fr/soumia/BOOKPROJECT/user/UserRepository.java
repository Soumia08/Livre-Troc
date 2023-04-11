package fr.soumia.BOOKPROJECT.user;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<UserInfo, Integer> {

	
	 
	UserInfo findOneByEmail( String email);
	
	
	
}


