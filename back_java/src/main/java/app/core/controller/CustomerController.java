package app.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Category;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.services.CustomerService;
import app.core.services.JwtUtil;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
	@Autowired
	CustomerService customerService;
	@Autowired
	private JwtUtil jwt;


	private CustomerService getCustomerService(String token) throws CouponException {
		if(jwt.isTokenExpired(token)) {
			throw new CouponException("token is expired");
		}
		int id=jwt.extractId(token);
		customerService.setCustomerId(id);
		return customerService;
			
			
	}
	
	@GetMapping("/getall")
	public List<Coupon> getCustomerCoupons(@RequestHeader String token) {
		try {
			return getCustomerService(token).getCustomerCoupons();
		
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/getall-Category")
	public List<Coupon> getCustomerCouponsByCategory(@RequestParam Category category,@RequestHeader String token) {
		try {
			return getCustomerService(token).getCustomerCouponsByCategory(category);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/getall-maxPrice")
	public List<Coupon> getCustomerCouponsByMaxPrice(@RequestParam double maxPrice,@RequestHeader String token) {
		try {
			List<Coupon> coupons= getCustomerService(token).getCustomerCouponsMaxPrice(maxPrice);
			System.out.println(coupons);
			System.out.println("========================================================");
			System.out.println(maxPrice);
			System.out.println("========================================================");

			return coupons;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
			// TODO: handle exception
		}
	}

	@PostMapping(path= "/purchase/{id}",produces =  {
			MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }
  )
	public Coupon purchaseCoupon(@PathVariable int id,@RequestHeader String token) throws CouponException {
		try {
			Coupon coupon= getCustomerService(token).purchaseCoupon(id);
			return coupon;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@GetMapping("/detalis")
	public Customer getCustomerDetails(@RequestHeader String token) throws CouponException {
		return getCustomerService(token).getCustomerDetails();
	}
}