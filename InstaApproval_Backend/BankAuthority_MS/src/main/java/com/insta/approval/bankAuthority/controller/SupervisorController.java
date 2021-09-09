package com.insta.approval.bankAuthority.controller;


import com.insta.approval.bankAuthority.exception.ResourceNotFoundException;
import com.insta.approval.bankAuthority.model.Customer;
import com.insta.approval.bankAuthority.model.Supervisor;
import com.insta.approval.bankAuthority.repository.CustomerRepository;
import com.insta.approval.bankAuthority.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    @Autowired
    private CustomerRepository customerRepository;



    // create supervisor rest api
    // Set supervisor with supervisorId, name, username and pwd. No need to initialise customer list
    @PostMapping("/supervisors")
    public Supervisor createSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.saveSupervisor(supervisor);
    }

    // get all supervisors
    @GetMapping("/supervisors")
    public List<Supervisor> getAllSupervisors() {
        return supervisorService.getAllSupervisors();
    }

    // get supervisor by id rest api
    @GetMapping("/supervisors/{id}")
    public ResponseEntity<Supervisor> getSupervisorById(@PathVariable Long id) {
        Supervisor supervisor = supervisorService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + id));
        return ResponseEntity.ok(supervisor);
    }

    // delete employee rest api
    @DeleteMapping("/supervisors/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
        Supervisor supervisor = supervisorService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + id));
        supervisorService.delete(supervisor);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ADD A NEW CUSTOMER TO SUPERVISOR in CustomersUnderSupervisorList
    // -----------------------------------------------------------------------------------------------------------------
    // update supervisor customer list rest api
    // Send the entire Customer object to this mapping and it will post it to CustomerList to manger with the given ID in the url.
    @PostMapping("/supervisors/{supervisorId}/addCustomerToSupervisorList")
    public ResponseEntity<Supervisor> updateSupervisorListAddNewCust(@PathVariable Long supervisorId, @RequestBody Customer customerDetails){
        Supervisor supervisor = supervisorService.findById(supervisorId).orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + supervisorId));
        Set<Customer> customersUnderSupervisor = supervisor.getCustomersUnderSupervisor();
        // Add object to supervisor
        Customer d = new Customer();
        for (Customer c:customersUnderSupervisor) {
            if (c.getId() == customerDetails.getId()) {
                d = c;
            }
        }
        customersUnderSupervisor.remove(d);
        customersUnderSupervisor.add(customerDetails);
        supervisor.setCustomersUnderSupervisor(customersUnderSupervisor);
        Supervisor updatedSupervisor = supervisorService.save(supervisor);
        return ResponseEntity.ok(updatedSupervisor);
    }

    @PostMapping("/supervisors/{supervisorId}/removeCustomerFromSupervisorList")
    public ResponseEntity<Supervisor> updateSupervisorListRemoveCust(@PathVariable Long supervisorId, @RequestBody Customer customerDetails){
        Supervisor supervisor = supervisorService.findById(supervisorId).orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + supervisorId));
        Set<Customer> customersUnderSupervisor = supervisor.getCustomersUnderSupervisor();
        Customer d = new Customer();
        for (Customer c:customersUnderSupervisor) {
            if (c.getId() == customerDetails.getId()) {
                d = c;
            }
        }
        customersUnderSupervisor.remove(d);
        supervisor.setCustomersUnderSupervisor(customersUnderSupervisor);
        Supervisor updatedSupervisor = supervisorService.save(supervisor);
        return ResponseEntity.ok(updatedSupervisor);
    }



    // -----------------------------------------------------------------------------------------------------------------
    // APPROVE / REJECT
    // -----------------------------------------------------------------------------------------------------------------

    // in service -> Send custId (eg. 2) as a Parameter to PUT request
    // action -> "approve", "reject"
    @PutMapping("/supervisors/{supervisorId}/updateCustomerStatus/{action}")
    public ResponseEntity<Customer> updateSupervisorListUpdateExistingCust(@PathVariable Long supervisorId, @PathVariable String action, @RequestBody Long custId){
        Supervisor supervisor = supervisorService.findById(supervisorId).orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + supervisorId));
        if (supervisor.getCustomersUnderSupervisor().contains(customerRepository.findById(custId).orElseThrow())) {
            Customer d = customerRepository.findById(custId).orElseThrow(() -> new ResourceNotFoundException("Supervisor does not exist with id :" + supervisorId));
            d.setStatus(action.equals("approve")? "Approved by Supervisor" : "Rejected by Supervisor");
            Customer updatedCustomer = customerRepository.save(d);
            return ResponseEntity.ok(updatedCustomer);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
