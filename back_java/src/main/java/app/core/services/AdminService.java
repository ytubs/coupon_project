package app.core.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.repositories.CompanyRepository;
import app.core.repositories.CouponRepository;
import app.core.repositories.CustomerRepository;

@Service
@Transactional
public class AdminService implements ClientService {
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	private CustomerRepository customerRepository;
	private int id = 0;
	private String token;

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public Company addCompany(Company company) throws CouponException {

		List<Company> companies = companyRepository.findAll();
		for (Company company2 : companies) {
			if (company.getEmail().equalsIgnoreCase(company2.getEmail())
					|| company.getName().equalsIgnoreCase(company2.getName())) {
				throw new CouponException("you cannot add company with the same name or email");
			}
		}
		companyRepository.save(company);
		System.out.println("company with id: " + company.getId() + " has been added");
		return company;

	}

	public Company updateCompany(Company company) throws CouponException {
		Company company2 = getOneCompany(company.getId());
		if (company2 != null && company2.getName().equals(company.getName())) {
			company2.setCoupons(company.getCoupons());
			company2.setEmail(company.getEmail());
			company2.setPassword(company.getPassword());
			System.out.println("company with id: " + company.getId() + " has been updated");
			return company;
		} else {
			throw new CouponException("you cannot update a company name or its id");

		}

	}


	public void deleteCompany(int companyId) {
		companyRepository.deleteById(companyId);
		System.out.println("company with id: " + companyId + " has been deleted");

	}

	public List<Company> getAllCompanies() {
		return companyRepository.findAll();
	}

	public Company getOneCompany(int id) throws CouponException {
		Optional<Company> opt = companyRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			throw new CouponException("there is no such company with this id " + id);
		}
	}

	public Customer addCustomer(Customer customer) throws CouponException {
		List<Customer> customers = customerRepository.findAll();
		for (Customer customer2 : customers) {
			if (customer2.getEmail().equalsIgnoreCase(customer.getEmail()))
				throw new CouponException("email already exists in the db");
		}
		customerRepository.save(customer);
		System.out.println("customer with id: " + customer.getId() + " has been added");
		return customer;

	}

	public Customer updateCustomer(Customer customer) throws CouponException {
		Customer customer2 = customerRepository.getOne(customer.getId());
		if (customer2 != null) {
			customerRepository.save(customer);
			System.out.println("customer with id: " + customer.getId() + " has been updated");
return customer;
		} else {
			throw new CouponException("you cannot update a customer id");

		}

	}

	public void deleteCustomer(int id) {
		customerRepository.deleteById(id);
		System.out.println("customer with id: " + id + " has been deleted");

	}

	public Customer getOneCustomer(int id) throws CouponException {
		Optional<Customer> opt = customerRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			throw new CouponException("there is no such customer with this id " + id);
		}
	}

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public List<Coupon> getAllCoupons() {
		return couponRepository.findAll();
	}

	@Override
	public ClientService login(String email, String password) {
		return null;
	}
}
