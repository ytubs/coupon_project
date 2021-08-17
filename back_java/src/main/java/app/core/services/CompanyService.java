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
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.CouponModel;
import app.core.entities.Customer;
import app.core.repositories.CompanyRepository;
import app.core.repositories.CouponRepository;
import app.core.repositories.CustomerRepository;

@Service
@Transactional
@Scope("prototype")
public class CompanyService implements ClientService {
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	private CustomerRepository customerRepository;
	private String token;
@Autowired
	private FileStorageService service;
	private int companyId;

	public Coupon addCoupon(CouponModel couponModel) throws CouponException {
		Coupon coupon=new Coupon();
		coupon.setAmount(couponModel.getAmount());
		coupon.setCategory(Category.valueOf(Category.class, couponModel.getCategory()));
		coupon.setDescription(couponModel.getDescription());
		coupon.setEndDate(LocalDate.parse(couponModel.getEndDate()) );
		coupon.setStartDate(LocalDate.parse(couponModel.getStartDate()));
		coupon.setImage(service.storeFile(couponModel.getImage()) );
		coupon.setTitle(couponModel.getTitle());
coupon.setPrice(couponModel.getPrice());
		List<Coupon> coupons = couponRepository.findByCompanyId(companyId);
		for (Coupon coupon2 : coupons) {
			if (coupon2.getTitle().equalsIgnoreCase(coupon.getTitle())) {
				throw new CouponException("you cannot add a coupon with exsiting title to the same company");

			}
			if (coupon.getEndDate().isBefore(coupon.getStartDate())) {
				throw new CouponException("you cannot add a coupon with end date thats before his start date");

			}
			if(coupon.getEndDate().isBefore(LocalDate.now())) {
				throw new CouponException("you cannot add a coupon with end date thats before today");

			}
		}
		Optional<Company> optCompany = companyRepository.findById(companyId);
		Company company = optCompany.get();
		company.addCoupon(coupon);
		System.out.println(couponModel);
		return coupon;
	}

	public Coupon updateCoupon(CouponModel couponModel) throws CouponException {
		Coupon coupon2 = getoneCoupon(couponModel.getId());
		int id2 = coupon2.getCompany().getId();
		if (this.companyId == id2) {
			coupon2.setAmount(couponModel.getAmount());
			coupon2.setCategory(Category.valueOf(Category.class, couponModel.getCategory()));
			coupon2.setDescription(couponModel.getDescription());
			coupon2.setEndDate(LocalDate.parse(couponModel.getEndDate()));
			coupon2.setStartDate(LocalDate.parse(couponModel.getStartDate()));
		if(couponModel.getImage()==null) {
			coupon2.setImage(coupon2.getImage());}
		else {
			coupon2.setImage(service.storeFile(couponModel.getImage()) );
		}
		coupon2.setPrice(couponModel.getPrice());

			coupon2.setTitle(couponModel.getTitle());
			System.out.println("coupon with id: " + couponModel.getId() + "has been updated");
			return coupon2;
		} else {
			throw new CouponException("you cannot change coupon id or company id");
		}
	}

	public Coupon getoneCoupon(int id) throws CouponException {
		Optional<Coupon> opt = couponRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			throw new CouponException("there is no such coupon with this id " + id);
		}
	}

	public void deleteCoupon(int id) throws CouponException {
		Coupon coupon = getoneCoupon(id);
		couponRepository.delete(coupon);
		System.out.println("coupon with id: " + id + "has been deleted");

	}

	public List<Coupon> getAllCoupons() {
		List<Coupon> coupons = couponRepository.findAll();
		List<Coupon> coupons2 = new ArrayList<Coupon>();
		for (Coupon coupon : coupons) {
			if (coupon.getCompany().getId() == this.companyId) {
				coupons2.add(coupon);
			}
		}
		return coupons2;
	}

	public List<Coupon> getAllCouponsByCategory(Category category) {
		List<Coupon> coupons = couponRepository.findByCategory(category);
		List<Coupon> coupons2 = new ArrayList<Coupon>();
		for (Coupon coupon : coupons) {
			if (coupon.getCompany().getId() == this.companyId) {
				coupons2.add(coupon);
			}

		}
		return coupons2;
	}

	public List<Coupon> getAllCouponsByMaxPrice(double maxPrice) {
		List<Coupon> coupons = couponRepository.findByPriceLessThan(maxPrice);
		List<Coupon> coupons2 = new ArrayList<Coupon>();
		for (Coupon coupon : coupons) {
			if (coupon.getCompany().getId() == this.companyId) {
				coupons2.add(coupon);
			}

		}
		return coupons2;
	}

	public Company getCompanyDetails() {
		Optional<Company> opt = companyRepository.findById(companyId);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	@Override
	public ClientService login(String email, String password) {
		// TODO Auto-generated method stub
		return null;
	}
}