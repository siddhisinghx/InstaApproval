package com.insta.approval.bankAuthority.repository;

import com.insta.approval.bankAuthority.model.SalesOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SalesOfficerRepository extends JpaRepository<SalesOfficer, Long> {
}
