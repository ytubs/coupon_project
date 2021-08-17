package app.core.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.core.entities.Coupon;
import app.core.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
//	List<Coupon> findByCategoryIn(List<Coupon>coupons,Category category);
//	List<Coupon> findByPriceIn(List<Coupon>coupons,double maxPrice);
Customer findByEmailAndPassword(String email,String password);

}
