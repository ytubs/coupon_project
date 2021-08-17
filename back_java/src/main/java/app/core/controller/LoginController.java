package app.core.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.LoginManager.ClientType;
import app.core.LoginManager.LoginManager;
import app.core.entities.Company;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.repositories.CompanyRepository;
import app.core.repositories.CustomerRepository;
import app.core.services.ClientService;
import app.core.services.JwtUtil;
import app.core.services.JwtUtil.UserDetails;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginController {
	@Autowired
	private LoginManager loginManager;
	@Autowired
	private JwtUtil util;
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	CustomerRepository customerRepository;

	private int id;

	@PostMapping("/login/{clientType}/{password}/{email}")
	public UserDetails login(@PathVariable ClientType clientType,@PathVariable String password,@PathVariable String email) throws CouponException {
		
		System.out.println("-----------------------------");
		System.out.println(clientType);
		System.out.println(password);
		System.out.println(email);
		System.out.println("-----------------------------");

		//try {
//			switch (clientType) {
//			case adminstrator:
//				id = 0;
//				isExsits = true;
//				break;
//			case company:
//				Company company = companyRepository.findByEmailAndPassword(email, password);
//				if (company != null) {
//					id = company.getId();
//				}
//				break;
//			case customer:
//				Customer customer = customerRepository.findByEmailAndPassword(email, password);
//				if (customer != null) {
//					id = customer.getId();
//					isExsits = true;
//
//				}
//				break;

//			}
		id=loginManager.Login(email, password, clientType);

			if (id != -1) {
				UserDetails details = new UserDetails(id, email, clientType);
				String token = util.generateToken(details);
				details.token=token;
				return details;
			} else {
throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);			//}
		//} catch (Exception e) {
		//	System.out.println(e.getMessage());
			//throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
}