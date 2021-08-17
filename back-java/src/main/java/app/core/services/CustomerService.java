package app.core.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import app.core.entities.Category;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.repositories.CompanyRepository;
import app.core.repositories.CouponRepository;
import app.core.repositories.CustomerRepository;

@Service
@Transactional
@Scope("prototype")

public class CustomerService implements ClientService {
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	private CustomerRepository customerRepository;
	private String token;

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	private int customerId;

	public Coupon purchaseCoupon(int id) throws CouponException {
		Coupon coupon = couponRepository.getOne(id);
		Customer customer = getCustomerDetails();
		List<Coupon> coupons = customer.getCoupons();
		for (Coupon coupon2 : coupons) {
			if (coupon.equals(coupon2)) {
				throw new CouponException("purchase already exists");
			}
		}
		if (coupon.getAmount() < 1 || coupon.getEndDate().isBefore(LocalDate.now()))
			throw new CouponException(
					"you canot purchase an expired coupon or coupon that his amount is less then one");

		coupons.add(coupon);
		coupon.setAmount(coupon.getAmount() - 1);
		customer.setCoupons(coupons);
		System.out.println("coupon with id: " + id + " has been purchased by customer with id: " + this.customerId);
		return coupon;
	}

	public Customer getCustomerDetails() {
		Optional<Customer> opt = customerRepository.findById(customerId);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	public List<Coupon> getCustomerCoupons() {
		Customer customer = getCustomerDetails();
		List<Coupon> coupons = customer.getCoupons();
		if (!coupons.isEmpty()) {
			return coupons;
		} else {
			return coupons;
		}

	}

	public List<Coupon> getCustomerCouponsByCategory(Category category) {
		List<Coupon> coupons1 = getCustomerCoupons();
		List<Coupon> coupons2 = new ArrayList<Coupon>();

		for (Coupon coupon : coupons1) {
			if (coupon.getCategory().equals(category)) {
				coupons2.add(coupon);
			}
		}
		return coupons1;
	}

	public List<Coupon> getCustomerCouponsMaxPrice(double maxPrice) {
		Customer customer = getCustomerDetails();
		List<Coupon> coupons = customer.getCoupons();
		List<Coupon> coupons1=new ArrayList<Coupon>();
		for (Coupon coupon : coupons) {
			if(coupon.getPrice()< maxPrice)
				coupons1.add(coupon);
		}
		return coupons1;
	}

	@Override
	public ClientService login(String email, String password) {
		// TODO Auto-generated method stub
		return null;
	}

}