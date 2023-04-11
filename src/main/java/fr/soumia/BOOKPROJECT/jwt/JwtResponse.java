package fr.soumia.BOOKPROJECT.jwt;

import fr.soumia.BOOKPROJECT.user.UserInfo;

public class JwtResponse {
	
	 private String userName;
	 
//	 private UserInfo userInfo;
	 
//	 String username = userInfo.getFirstName();
	 
	    public JwtResponse(String username ) {
	    	
	    	this.userName = username;
	        
	    }

	    public String getUserName() {
	        return userName;
	    }

	    public void setUserName(String userName) {
	        this.userName = userName;
	    }
}
