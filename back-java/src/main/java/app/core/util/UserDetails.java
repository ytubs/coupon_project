package app.core.util;

import app.core.LoginManager.ClientType;

public class UserDetails {
public int id;
public String token;
public ClientType clientType;
public String email;
public UserDetails(int id, String token, ClientType clientType, String email) {
	super();
	this.id = id;
	this.token = token;
	this.clientType = clientType;
	this.email = email;
}


}
