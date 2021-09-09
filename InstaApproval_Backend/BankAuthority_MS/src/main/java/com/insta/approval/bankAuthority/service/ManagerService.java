package com.insta.approval.bankAuthority.service;

import com.insta.approval.bankAuthority.model.Customer;
import com.insta.approval.bankAuthority.model.Manager;
import com.insta.approval.bankAuthority.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public Optional<Manager> findById(Long id) {
        return managerRepository.findById(id);
    }

    public Manager save(Manager manager) {
        return managerRepository.save(manager);
    }

    public void delete(Manager manager) {
        managerRepository.delete(manager);
    }
}
