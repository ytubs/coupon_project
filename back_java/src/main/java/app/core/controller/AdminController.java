package app.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.services.AdminService;
import app.core.services.CompanyService;
import app.core.services.JwtUtil;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService adminService;
	@Autowired
	private JwtUtil jwt;

	private AdminService getAdminService(String token) throws CouponException {
if(jwt.isTokenExpired(token)) {
	throw new CouponException("token is expired");
}
int id=jwt.extractId(token);
adminService.setId(id);
return adminService;
	}
	
	
	@PostMapping("/add-company")
	public Company addCompany(@RequestBody Company company,@RequestHeader String token) throws CouponException {
		try {
			return getAdminService(token).addCompany(company);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@PostMapping("/add-customer")
	public Customer addCustomer(@RequestBody Customer customer,@RequestHeader String token) throws CouponException {
		try {
		return	getAdminService(token).addCustomer(customer);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@DeleteMapping("/delete-company")
	public void deleteCompany(@RequestParam int id,@RequestHeader String token) {
		try {
			getAdminService(token).deleteCompany(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@DeleteMapping("/delete-customer")
	public void deleteCustomer(@RequestParam int id,@RequestHeader String token) {
		try {
			getAdminService(token).deleteCustomer(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}

	}

	@GetMapping("/get-company")
	public Company getOneCompany(@RequestParam int id,@RequestHeader String token) throws CouponException {
		try {
			return getAdminService(token).getOneCompany(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/get-customer")
	public Customer getOneCustomer(@RequestParam int id,@RequestHeader String token) throws CouponException {
		try {
			return getAdminService(token).getOneCustomer(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
			// TODO: handle exception
		}
	}

	@GetMapping("/getall-companies")
	public List<Company> getAllCompanies(@RequestHeader String token) {
		try {

			return getAdminService(token).getAllCompanies();
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/getall-customers")
	public List<Customer> getAllCustomers(@RequestHeader String token) {
		try {
			return getAdminService(token).getAllCustomers();

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PutMapping("/update-company")
	public Company updateCompany(@RequestBody Company company,@RequestHeader String token) throws CouponException {
		try {
		return	getAdminService(token).updateCompany(company);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PutMapping("/update-customer")
	public Customer updateCustomer(@RequestBody Customer customer,@RequestHeader String token) throws CouponException {
		try {

		return	getAdminService(token).updateCustomer(customer);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
		}
	@GetMapping("/getAllCoupons")
	public List<Coupon> getAllCoupons() {
	System.out.println("whats your problem");
		return	adminService.getAllCoupons();

	}
	

}