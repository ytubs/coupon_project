package app.core;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;

import app.core.LoginManager.ClientType;
import app.core.LoginManager.LoginManager;
import app.core.entities.Category;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.CouponException;
import app.core.entities.Customer;
import app.core.services.AdminService;
import app.core.services.CompanyService;
import app.core.services.CustomerService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@CrossOrigin
public class CouponSystemSpringApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(CouponSystemSpringApplication.class, args);


}}