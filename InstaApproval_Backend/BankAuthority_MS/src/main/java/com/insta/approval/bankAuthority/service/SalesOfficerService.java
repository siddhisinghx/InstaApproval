package com.insta.approval.bankAuthority.service;

import com.insta.approval.bankAuthority.model.SalesOfficer;
import com.insta.approval.bankAuthority.repository.SalesOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class SalesOfficerService {
    @Autowired
    private SalesOfficerRepository salesOfficerRepository;

    public SalesOfficer saveSalesOfficer(SalesOfficer salesOfficer) {
        return salesOfficerRepository.save(salesOfficer);
    }

    public List<SalesOfficer> getAllSalesOfficers() {
        return salesOfficerRepository.findAll();
    }

    public Optional<SalesOfficer> findById(Long id) {
        return salesOfficerRepository.findById(id);
    }

    public SalesOfficer save(SalesOfficer salesOfficer) {
        return salesOfficerRepository.save(salesOfficer);
    }

    public void delete(SalesOfficer manager) {
        salesOfficerRepository.delete(manager);
    }
}
