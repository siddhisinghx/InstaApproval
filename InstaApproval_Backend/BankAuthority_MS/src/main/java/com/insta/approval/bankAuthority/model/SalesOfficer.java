package com.insta.approval.bankAuthority.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "salesOfficers")
public class SalesOfficer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long salesOfficerId;
    private String salesOfficerName;
    private String salesOfficerUsername;
    private String salesOfficerPassword;

    @OneToMany(cascade = CascadeType.ALL)
    Set<Customer> customersUnderSalesOfficer = new HashSet<>();

    public SalesOfficer() {
    }

    public SalesOfficer(String salesOfficerName, String salesOfficerUsername, String salesOfficerPassword) {
        this.salesOfficerName = salesOfficerName;
        this.salesOfficerUsername = salesOfficerUsername;
        this.salesOfficerPassword = salesOfficerPassword;
    }


    public long getSalesOfficerId() {
        return salesOfficerId;
    }

    public void setSalesOfficerId(long salesOfficerId) {
        this.salesOfficerId = salesOfficerId;
    }

    public String getSalesOfficerName() {
        return salesOfficerName;
    }

    public void setSalesOfficerName(String salesOfficerName) {
        this.salesOfficerName = salesOfficerName;
    }

    public String getSalesOfficerUsername() {
        return salesOfficerUsername;
    }

    public void setSalesOfficerUsername(String salesOfficerUsername) {
        this.salesOfficerUsername = salesOfficerUsername;
    }

    public String getSalesOfficerPassword() {
        return salesOfficerPassword;
    }

    public void setSalesOfficerPassword(String salesOfficerPassword) {
        this.salesOfficerPassword = salesOfficerPassword;
    }

    public Set<Customer> getCustomersUnderSalesOfficer() {
        return customersUnderSalesOfficer;
    }

    public void setCustomersUnderSalesOfficer(Set<Customer> customersUnderSalesOfficer) {
        this.customersUnderSalesOfficer = customersUnderSalesOfficer;
    }
}
