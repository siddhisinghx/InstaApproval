package com.insta.approval.bankAuthority.controller;


import com.insta.approval.bankAuthority.exception.ResourceNotFoundException;
import com.insta.approval.bankAuthority.model.Customer;
import com.insta.approval.bankAuthority.model.SalesOfficer;
import com.insta.approval.bankAuthority.repository.CustomerRepository;
import com.insta.approval.bankAuthority.service.SalesOfficerService;
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
public class SalesOfficerController {

    @Autowired
    private SalesOfficerService salesOfficerService;

    @Autowired
    private CustomerRepository customerRepository;



    // create salesOfficer rest api
    // Set salesOfficer with salesOfficerId, name, username and pwd. No need to initialise customer list
    @PostMapping("/salesOfficers")
    public SalesOfficer createSalesOfficer(@RequestBody SalesOfficer salesOfficer) {
        return salesOfficerService.saveSalesOfficer(salesOfficer);
    }

    // get all salesOfficers
    @GetMapping("/salesOfficers")
    public List<SalesOfficer> getAllSalesOfficers() {
        return salesOfficerService.getAllSalesOfficers();
    }

    // get salesOfficer by id rest api
    @GetMapping("/salesOfficers/{id}")
    public ResponseEntity<SalesOfficer> getSalesOfficerById(@PathVariable Long id) {
        SalesOfficer salesOfficer = salesOfficerService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SalesOfficer does not exist with id :" + id));
        return ResponseEntity.ok(salesOfficer);
    }

    // delete salesOfficer rest api
    @DeleteMapping("/salesOfficers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
        SalesOfficer salesOfficer = salesOfficerService.findById(id).orElseThrow(() -> new ResourceNotFoundException("SalesOfficer does not exist with id :" + id));
        salesOfficerService.delete(salesOfficer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ADD A NEW CUSTOMER TO SALESOFFICER in CustomersUnderSalesOfficerList
    // -----------------------------------------------------------------------------------------------------------------

    // update salesOfficer customer list rest api
    // Send the entire Customer object to this mapping and it will post it to CustomerList to manger with the given ID in the url.
    @PostMapping("/salesOfficers/{salesOfficerId}/addCustomerToSalesOfficerList")
    public ResponseEntity<SalesOfficer> updateSalesOfficerListAddNewCust(@PathVariable Long salesOfficerId, @RequestBody Customer customerDetails){
        SalesOfficer salesOfficer = salesOfficerService.findById(salesOfficerId).orElseThrow(() -> new ResourceNotFoundException("SalesOfficer does not exist with id :" + salesOfficerId));
        Set<Customer> customersUnderSalesOfficer = salesOfficer.getCustomersUnderSalesOfficer();
        // Remove current existing objects
        Customer d = new Customer();
        for (Customer c:customersUnderSalesOfficer) {
            if (c.getId() == customerDetails.getId()) {
                System.out.println(customersUnderSalesOfficer);
                d = c;
            }
        }
        customersUnderSalesOfficer.remove(d);
        customersUnderSalesOfficer.add(customerDetails);
        salesOfficer.setCustomersUnderSalesOfficer(customersUnderSalesOfficer);
        SalesOfficer updatedSalesOfficer = salesOfficerService.save(salesOfficer);
        return ResponseEntity.ok(updatedSalesOfficer);
    }



    // -----------------------------------------------------------------------------------------------------------------
    // APPROVE / REJECT
    // -----------------------------------------------------------------------------------------------------------------

    // in service -> Send custId (eg. 2) as a Parameter to PUT request
    // action -> "approve", "reject"
    @PutMapping("/salesOfficers/{salesOfficerId}/updateCustomerStatus/{action}")
    public ResponseEntity<Customer> updateSalesOfficerListUpdateExistingCust(@PathVariable Long salesOfficerId, @PathVariable String action, @RequestBody Long custId){
        SalesOfficer salesOfficer = salesOfficerService.findById(salesOfficerId).orElseThrow(() -> new ResourceNotFoundException("SalesOfficer does not exist with id :" + salesOfficerId));
        if (salesOfficer.getCustomersUnderSalesOfficer().contains(customerRepository.findById(custId).orElseThrow())) {
            Customer d = customerRepository.findById(custId).orElseThrow(() -> new ResourceNotFoundException("SalesOfficer does not exist with id :" + salesOfficerId));
            d.setStatus(action.equals("approve")? "Approved by SalesOfficer" : "Rejected by SalesOfficer");
            Customer updatedCustomer = customerRepository.save(d);
            return ResponseEntity.ok(updatedCustomer);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
