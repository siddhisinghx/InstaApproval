package com.insta.approval.bankAuthority.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.insta.approval.bankAuthority.model.Customer;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

}
