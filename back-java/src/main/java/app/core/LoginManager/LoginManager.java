package app.core.LoginManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import app.core.entities.Company;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.repositories.CompanyRepository;
import app.core.repositories.CustomerRepository;
import app.core.services.AdminService;
import app.core.services.ClientService;
import app.core.services.CompanyService;
import app.core.services.CustomerService;

@Component
@CrossOrigin
public class LoginManager {
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	AdminService adminService;
	@Autowired
	CustomerService customerService;
	@Autowired
	CompanyService companyService;

	public int Login(String email, String password, ClientType clientType) throws CouponException {
		
		switch (clientType) {
		case adminstrator:
			if (email.equalsIgnoreCase("admin@admin") && password.equalsIgnoreCase("admin")) {
				return 0;
			} else
				throw new CouponException("failed at admin loign,please check your email password,and client type\"");
		case company:
			Company company = companyRepository.findByEmailAndPassword(email, password);
			if (company != null) {
				int id = company.getId();
				companyService.setCompanyId(id);
				return id;
			} else
				throw new CouponException("failed at company loign,please check your email password,and client type");

		case customer:
			Customer customer = customerRepository.findByEmailAndPassword(email, password);
			if (customer != null) {
				int id = customer.getId();
				customerService.setCustomerId(id);
				return id;
			} else
				throw new CouponException("failed at customer loign,please check your email password,and client type");

		}
		return -1;
	}
}