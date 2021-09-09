package com.insta.approval.bankAuthority.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insta.approval.bankAuthority.model.Manager;
import com.insta.approval.bankAuthority.model.SalesOfficer;
import com.insta.approval.bankAuthority.model.Supervisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insta.approval.bankAuthority.exception.ResourceNotFoundException;
import com.insta.approval.bankAuthority.model.Customer;
import com.insta.approval.bankAuthority.repository.CustomerRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {

	@Autowired
	private CustomerRepository customerRepository;
	
	// get all employees
	@GetMapping("/customers")
	public List<Customer> getAllCustomers(){
		return customerRepository.findAll();
	}		
	
	// create employee rest api
	@PostMapping("/customers")
	public Customer createCustomer(@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}
	
	// get employee by id rest api
	@GetMapping("/customers/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id :" + id));
		return ResponseEntity.ok(customer);
	}
	
	// update employee rest api
	
	@PutMapping("/customers/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails){
//		Customer customer = customerRepository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id :" + id));
		
//		customer.setName(customerDetails.getName());
//		customer.setContact(customerDetails.getContact());
//		customer.setAdhaar(customerDetails.getAdhaar());
//		customer.setPancard(customerDetails.getPancard());
//		customer.setEmail(customerDetails.getEmail());
//		customer.setStatus(customerDetails.getStatus());
//		customer.setLoanAmount(customerDetails.getLoanAmount());
//		customer.setCibilScore(customerDetails.getCibilScore());

		Customer updatedCustomer = customerRepository.save(customerDetails);
		return ResponseEntity.ok(updatedCustomer);
	}
	
	// delete employee rest api
	@DeleteMapping("/customers/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id :" + id));
		customerRepository.delete(customer);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	@Autowired
	SalesOfficerController soc;

	@Autowired
	SupervisorController sc;

	@Autowired
	ManagerController mc;

	@RequestMapping("/project/reset")
	public void resetAll() {

		soc.createSalesOfficer(new SalesOfficer("Divya Gahlot", "divya", "password"));
		sc.createSupervisor(new Supervisor("Krishna Manmayi", "manmayi", "password"));
		mc.createManager(new Manager("Siddhi Singh", "siddhi", "password"));

		List<Customer> customers = new ArrayList<>();
		customers.add(new Customer(752282,"Purvasha","password", 9988776655l, 111122223334l, "POOIY7788B", "purvasha@gmail.com", "pending",600000, 301,500000,"pending",new ArrayList<String>(List.of( "752282_incDoc_1", "752282_incDoc_2" )),
				new ArrayList<String>(List.of("752282_idDoc_1")),new ArrayList<String>(List.of("752282_addDoc_1"))));
		customers.add(new Customer(794094,"Tarushi","password", 9191919191l, 777766665555l, "BTREW8877B", "tarushi@gmail.com", "pending",1000000, 678,750000,"pending",new ArrayList<String>(List.of( "794094_incDoc_1", "794094_incDoc_2")),
				new ArrayList<String>(List.of("794094_idDoc_1")),new ArrayList<String>(List.of("794094_addDoc_1"))));
		customers.add(new Customer(959560,"Divyansh","password", 9292929292l, 777755554444l, "QWERT5544B", "divyansh@gmail.com", "pending",40000, 511,200000,"pending",new ArrayList<String>(List.of(  "959560_incDoc_1", "959560_incDoc_2" )),
				new ArrayList<String>(List.of("959560_idDoc_1")),new ArrayList<String>(List.of("959560_addDoc_1"))));
		customers.add(new Customer(338044,"Abhishek","password", 8877991123l, 712344557612l, "YYTEI8102R", "abhishek@gmail.com", "pending",120000, 902,500000,"pending",new ArrayList<String>(List.of( "338044_incDoc_1" )),
				new ArrayList<String>(List.of("338044_idDoc_1")),new ArrayList<String>(List.of("338044_addDoc_1"))));
		customers.add(new Customer(150665,"Ishan","password", 9000765541l, 877865731634l, "KKUYT8123Z", "ishan@gmail.com", "pending",400000, 102,750000,"pending",new ArrayList<String>(List.of("150665_incDoc_1", "150665_incDoc_2")),
				new ArrayList<String>(List.of("150665_idDoc_1")),new ArrayList<String>(List.of("150665_addDoc_1"))));
		customers.add(new Customer(916328,"Priyanshu","password", 8877990072l, 655728738712l, "BBEEW4333T", "priyanshu@gmail.com", "pending",200000, 765,830000,"pending",new ArrayList<String>(List.of("916328_incDoc_1", "916328_incDoc_2" )),
				new ArrayList<String>(List.of( "916328_idDoc_1")),new ArrayList<String>(List.of("916328_addDoc_1" ))));
		customers.add(new Customer(427543,"Diksha","password", 8080003242l, 411127274632l, "MMMKO9877G", "diksha@gmail.com", "pending",350000, 342,780000,"pending",new ArrayList<String>(List.of( "427543_incDoc_1", "427543_incDoc_2")),
				new ArrayList<String>(List.of("427543_idDoc_1")),new ArrayList<String>(List.of("427543_addDoc_1"))));
		customers.add(new Customer(465615,"Yash","password", 9111236672l, 877956127461l, "WERTY5543N", "yash@gmail.com", "pending",550000, 786,980000,"pending",new ArrayList<String>(List.of( "465615_incDoc_1", "465615_incDoc_2")),
				new ArrayList<String>(List.of("465615_idDoc_1")),new ArrayList<String>(List.of( "465615_addDoc_1"))));
		customers.add(new Customer(874014,"Muskan","password", 9212333445l, 970184216542l, "QETRA6612C", "muskan@gmail.com", "pending",80000, 364,440000,"pending",new ArrayList<String>(List.of( "874014_incDoc_1", "874014_incDoc_2")),
				new ArrayList<String>(List.of("874014_idDoc_1")),new ArrayList<String>(List.of( "874014_addDoc_1"))));

		for (Customer c:customers) {
			createCustomer(c);
			soc.updateSalesOfficerListAddNewCust(1l, c);
		}


	}
}
