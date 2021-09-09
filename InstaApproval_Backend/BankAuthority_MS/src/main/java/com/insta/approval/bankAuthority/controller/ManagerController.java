package com.insta.approval.bankAuthority.controller;

import com.insta.approval.bankAuthority.exception.ResourceNotFoundException;
import com.insta.approval.bankAuthority.model.Customer;
import com.insta.approval.bankAuthority.model.Manager;
import com.insta.approval.bankAuthority.repository.CustomerRepository;
import com.insta.approval.bankAuthority.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @Autowired
    private CustomerRepository customerRepository;



    // create manager rest api
    // Set manager with managerId, name, username and pwd. No need to initialise customer list
    @PostMapping("/managers")
    public Manager createManager(@RequestBody Manager manager) {
        return managerService.saveManager(manager);
    }

    // get all managers
    @GetMapping("/managers")
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    // get manager by id rest api
    @GetMapping("/managers/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id) {
        Manager manager = managerService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + id));
        return ResponseEntity.ok(manager);
    }

    // delete employee rest api
    @DeleteMapping("/managers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
        Manager manager = managerService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + id));
        managerService.delete(manager);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ADD A NEW CUSTOMER TO MANAGER in CustomersUnderManagerList
    // -----------------------------------------------------------------------------------------------------------------

    // update manager customer list rest api
    // Send the entire Customer object to this mapping and it will post it to CustomerList to manger with the given ID in the url.
    @PostMapping("/managers/{managerId}/addCustomerToManagerList")
    public ResponseEntity<Manager> updateManagerListAddNewCust(@PathVariable Long managerId, @RequestBody Customer customerDetails){
        Manager manager = managerService.findById(managerId).orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + managerId));
        Set<Customer> customersUnderManager = manager.getCustomersUnderManager();
        // Remove current existing object
        Customer d = new Customer();
        for (Customer c:customersUnderManager) {
            if (c.getId() == customerDetails.getId()) {
                System.out.println(customersUnderManager);
                d = c;
            }
        }
        customersUnderManager.remove(d);
        customersUnderManager.add(customerDetails);
        manager.setCustomersUnderManager(customersUnderManager);
        Manager updatedManager = managerService.save(manager);
        return ResponseEntity.ok(updatedManager);
    }

    @PostMapping("/managers/{managerId}/removeCustomerFromManagerList")
    public ResponseEntity<Manager> updateManagerListRemoveCust(@PathVariable Long managerId, @RequestBody Customer customerDetails){
        Manager manager = managerService.findById(managerId).orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + managerId));
        Set<Customer> customersUnderManager = manager.getCustomersUnderManager();
        Customer d = new Customer();
        for (Customer c:customersUnderManager) {
            if (c.getId() == customerDetails.getId()) {
                System.out.println(customersUnderManager);
                d = c;
            }
        }
        customersUnderManager.remove(d);
        manager.setCustomersUnderManager(customersUnderManager);
        Manager updatedManager = managerService.save(manager);
        return ResponseEntity.ok(updatedManager);
    }



    // -----------------------------------------------------------------------------------------------------------------
    // APPROVE / REJECT
    // -----------------------------------------------------------------------------------------------------------------

    // in service -> Send custId (eg. 2) as a Parameter to PUT request
    // action -> "approve", "reject"
    @PutMapping("/managers/{managerId}/updateCustomerStatus/{action}")
    public ResponseEntity<Customer> updateManagerListUpdateExistingCust(@PathVariable Long managerId, @PathVariable String action, @RequestBody Long custId){
        Manager manager = managerService.findById(managerId).orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + managerId));
        if (manager.getCustomersUnderManager().contains(customerRepository.findById(custId).orElseThrow())) {
            Customer d = customerRepository.findById(custId).orElseThrow(() -> new ResourceNotFoundException("Manager does not exist with id :" + managerId));
            d.setStatus(action.equals("approve")? "Approved by Manager" : "Rejected by Manager");
            if (action.equals("pending")) {
                d.setStatus("pending");
            }
            System.out.println(action);
            System.out.println(d.getStatus());
            Customer updatedCustomer = customerRepository.save(d);
            return ResponseEntity.ok(updatedCustomer);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
