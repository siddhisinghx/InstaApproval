package com.insta.approval.bankAuthority.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "supervisors")
public class Supervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supervisorId;
    private String supervisorName;
    private String supervisorUsername;
    private String supervisorPassword;

    @OneToMany(cascade = CascadeType.ALL)
    Set<Customer> customersUnderSupervisor = new HashSet<>();

    public Supervisor() {
    }

    public Supervisor(String supervisorName, String supervisorUsername, String supervisorPassword) {
        this.supervisorName = supervisorName;
        this.supervisorUsername = supervisorUsername;
        this.supervisorPassword = supervisorPassword;
    }

    public long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(long supervisorId) {
        this.supervisorId = supervisorId;
    }

    public String getSupervisorName() {
        return supervisorName;
    }

    public void setSupervisorName(String supervisorName) {
        this.supervisorName = supervisorName;
    }

    public String getSupervisorUsername() {
        return supervisorUsername;
    }

    public void setSupervisorUsername(String supervisorUsername) {
        this.supervisorUsername = supervisorUsername;
    }

    public String getSupervisorPassword() {
        return supervisorPassword;
    }

    public void setSupervisorPassword(String supervisorPassword) {
        this.supervisorPassword = supervisorPassword;
    }

    public Set<Customer> getCustomersUnderSupervisor() {
        return customersUnderSupervisor;
    }

    public void setCustomersUnderSupervisor(Set<Customer> customersUnderSupervisor) {
        this.customersUnderSupervisor = customersUnderSupervisor;
    }
}
