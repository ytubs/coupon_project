package app.core.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.core.entities.Category;
import app.core.entities.Coupon;
import app.core.entities.Customer;
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer>  {
List<Coupon> findByCategory(Category category);
List<Coupon> findByPriceLessThan(double maxPrice);
Coupon findByEndDateBefore(LocalDate date);
void deleteByDescription(String name);
List<Coupon> findByCompanyId(int comapnyId);
List<Coupon> findByCustomersIdAndPriceLessThan(int customerId,double maxPrice);

}
