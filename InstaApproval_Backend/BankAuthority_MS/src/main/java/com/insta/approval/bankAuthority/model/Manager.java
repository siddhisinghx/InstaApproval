package com.insta.approval.bankAuthority.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "managers")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long managerId;
    private String managerName;
    private String managerUsername;
    private String managerPassword;

    @OneToMany
    Set<Customer> customersUnderManager = new HashSet<>();

    public Manager(String managerName, String managerUsername, String managerPassword) {
        this.managerName = managerName;
        this.managerUsername = managerUsername;
        this.managerPassword = managerPassword;
    }

    public Manager() {

    }

    public long getManagerId() {
        return managerId;
    }

    public void setManagerId(long managerId) {
        this.managerId = managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerUsername() {
        return managerUsername;
    }

    public void setManagerUsername(String managerUsername) {
        this.managerUsername = managerUsername;
    }

    public String getManagerPassword() {
        return managerPassword;
    }

    public void setManagerPassword(String managerPassword) {
        this.managerPassword = managerPassword;
    }

    public Set<Customer> getCustomersUnderManager() {
        return customersUnderManager;
    }

    public void setCustomersUnderManager(Set<Customer> customersUnderManager) {
        this.customersUnderManager = customersUnderManager;
    }
}
