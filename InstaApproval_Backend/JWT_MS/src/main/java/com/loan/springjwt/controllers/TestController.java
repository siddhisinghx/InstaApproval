package com.loan.springjwt.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('SALESOFFICER') or hasRole('SUPERVISOR') or hasRole('MANAGER')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/sales")
	@PreAuthorize("hasRole('SALESOFFICER')")
	public String moderatorAccess() {
		return "Sales Officer Content";
	}

	@GetMapping("/officer")
	@PreAuthorize("hasRole('OFFICER')")
	public String OfficerAccess() {
		return "Verifying Officer Content";
	}

	@GetMapping("/mang")
	@PreAuthorize("hasRole('MANAGER')")
	public String managerAccess() {
		return "Manager Content";
	}

	@GetMapping("/super")
	@PreAuthorize("hasRole('SUPERVISOR')")
	public String adminAccess() {
		return "Supervisor Content";
	}
}
