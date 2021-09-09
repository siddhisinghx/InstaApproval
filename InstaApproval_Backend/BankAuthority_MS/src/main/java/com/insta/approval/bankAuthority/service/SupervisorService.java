package com.insta.approval.bankAuthority.service;

import com.insta.approval.bankAuthority.model.Supervisor;
import com.insta.approval.bankAuthority.repository.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class SupervisorService {
    @Autowired
    private SupervisorRepository supervisorRepository;

    public Supervisor saveSupervisor(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }

    public List<Supervisor> getAllSupervisors() {
        return supervisorRepository.findAll();
    }

    public Optional<Supervisor> findById(Long id) {
        return supervisorRepository.findById(id);
    }

    public Supervisor save(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }

    public void delete(Supervisor supervisor) {
        supervisorRepository.delete(supervisor);
    }
}
