package fr.soumia.BOOKPROJECT.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.soumia.BOOKPROJECT.Book.Book;
import fr.soumia.BOOKPROJECT.jwt.JwtController;
import fr.soumia.BOOKPROJECT.jwt.JwtFilter;
import fr.soumia.BOOKPROJECT.jwt.JwtUtils;

@RestController
public class UserController {
	
		@Autowired
	    UserRepository userRepository;
		
		
		
	    @Autowired
	    JwtUtils jwtUtils;

	    @Autowired
	    JwtController jwtController;
	    
	    
   
	    
	    @PostMapping("/users")
	    public ResponseEntity add(@Valid @RequestBody UserInfo userInfo) {
	    	
	    	 UserInfo existingUser = userRepository.findOneByEmail(userInfo.getEmail());
	         if(existingUser != null) {
		    	            return new ResponseEntity("User already existing", HttpStatus.BAD_REQUEST);
		    	        }
	         UserInfo user = saveUser(userInfo);
	         Authentication authentication = jwtController.logUser(userInfo.getEmail(), userInfo.getPassword());
	         String jwt = jwtUtils.generateToken(authentication);
	         HttpHeaders httpHeaders = new HttpHeaders();
	         httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
	         return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
	    	    }
	    
	    @GetMapping("/isConnected")
	    public ResponseEntity getUSerConnected() {
	        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        if (principal instanceof UserDetails) {
	            return new ResponseEntity(((UserDetails) principal).getUsername(), HttpStatus.OK);
	        }
	        return new ResponseEntity("User is not connected", HttpStatus.FORBIDDEN);
	    }
	    
	    private UserInfo saveUser(UserInfo userInfo) {
	        UserInfo user = new UserInfo();
	        user.setEmail(userInfo.getEmail());
	        user.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));
	        user.setLastName(StringUtils.capitalize(userInfo.getLastName()));
	        user.setFirstName(StringUtils.capitalize(userInfo.getFirstName()));
	        userRepository.save(user);
	        return user;
	    }
	    
	    
	    @GetMapping(value="/isConnected/{email}")
		private String NameUser(@PathVariable("email") String email) {
	    	
	    	String newMail = email.toLowerCase();
	    	UserInfo user = userRepository.findOneByEmail(newMail);
	    	
	    	return user.getLastName() + " " + user.getFirstName();
	    	
	    }
	    
	    
}