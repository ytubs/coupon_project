package app.core.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.springframework.context.annotation.Scope;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Scope("prototype")
public class Coupon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH })
	@JoinColumn(name = "company_id")
	@JsonIgnore
	private Company company;
	private String title, description, image;
	private int amount;
	private LocalDate startDate, endDate;
	private double price;
	private Category category;
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "Customers_Coupons", joinColumns = @JoinColumn(name = "coupon_id"), inverseJoinColumns = @JoinColumn(name = "customer_id"))
	@JsonIgnore
	private List<Customer> customers;

	@Override
	public String toString() {
		return "Coupon [id=" + id +  ", title=" + title + ", description="
				+ description + ", image=" + image + ", amount=" + amount + ", startDate=" + startDate + ", endDate="
				+ endDate + ", price=" + price + ", category=" + category + ", customers=" + customers + "]";
	}

	
	public List<Customer> getCustomers() {
		return customers;
	}


	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}


	public Coupon(String title, String description, String image, int amount, LocalDate startDate, LocalDate endDate,
			double price, Category category) {
		super();
		this.company = company;
		this.title = title;
		this.description = description;
		this.image = image;
		this.amount = amount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.price = price;
		this.category = category;
	}

	public Coupon() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public void setId(int id) {
		this.id = id;
	}
//
//	public int getCompanyId() {
//		return companyId;
//	}
//
//	public void setCompanyId(int companyId) {
//		this.companyId = companyId;
//	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}
