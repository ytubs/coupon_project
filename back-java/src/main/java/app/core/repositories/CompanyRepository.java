package app.core.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.core.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
	Company findByEmailAndPassword(String email,String password);
	///int findIdByEmailAndPassword(String email,String password);

}
