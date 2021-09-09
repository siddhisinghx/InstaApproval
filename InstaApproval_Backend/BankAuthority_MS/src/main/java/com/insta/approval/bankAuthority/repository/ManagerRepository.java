package com.insta.approval.bankAuthority.repository;

import com.insta.approval.bankAuthority.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
