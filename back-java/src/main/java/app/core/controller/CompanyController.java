package app.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Category;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.CouponModel;
import app.core.services.CompanyService;
import app.core.services.JwtUtil;

@RestController
@RequestMapping("/comapny")
@CrossOrigin
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	@Autowired
	private JwtUtil jwt;

	
	private CompanyService getCompanyService(String token) throws CouponException {
if(jwt.isTokenExpired(token)) {
	throw new CouponException("token is expired");
}
int id=jwt.extractId(token);
companyService.setCompanyId(id);
return companyService;
	}
	
	
	@PostMapping("/add-coupon")
	public Coupon addCoupon(@ModelAttribute CouponModel coupon,@RequestHeader String token) throws CouponException {
		
		try {
		return	getCompanyService(token).addCoupon(coupon);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}

	}

	@DeleteMapping("/delete-coupon")
	public void deleteCoupon(@RequestParam int id,@RequestHeader String token) throws CouponException {
		try {
			getCompanyService(token).deleteCoupon(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@GetMapping("/getall")
	public List<Coupon> getAllCoupons(@RequestHeader String token) {
		try {
			return getCompanyService(token).getAllCoupons();

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/getAll-Category")
	public List<Coupon> getAllCouponsByCategory(@RequestParam Category category) {
		try {

			return companyService.getAllCouponsByCategory(category);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/getAll-maxPrice")
	public List<Coupon> getAllCouponsByMaxPrice(@RequestParam double maxPrice,@RequestHeader String token) {
		try {

			return getCompanyService(token).getAllCouponsByMaxPrice(maxPrice);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}

	}

	@GetMapping("/getone")
	public Coupon getOneCoupon(@RequestParam int id,@RequestHeader String token) throws CouponException {
		try {
			return getCompanyService(token).getoneCoupon(id);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PutMapping("/update")
	public Coupon updateCoupon(@ModelAttribute CouponModel coupon,@RequestHeader String token) throws CouponException {
		try {
		return	getCompanyService(token).updateCoupon(coupon);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}

	}

	@GetMapping("/details")
	public Company getCompanyDetails() {
		try {
			return companyService.getCompanyDetails();

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
