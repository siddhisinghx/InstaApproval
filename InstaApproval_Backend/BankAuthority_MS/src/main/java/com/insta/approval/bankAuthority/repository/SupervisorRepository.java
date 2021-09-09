package com.insta.approval.bankAuthority.repository;

import com.insta.approval.bankAuthority.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
}
