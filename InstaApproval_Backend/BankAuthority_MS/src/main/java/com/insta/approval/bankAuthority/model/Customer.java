package com.insta.approval.bankAuthority.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private long applicationNumber;
    private String username;
	private String password;
    private long contact;
    private long adhaar;
    private String pancard;
    private String email;
    private String status;
    private int loanAmount;
    private int cibilScore;
	private long income;
	private String documentsVerified;
	@ElementCollection
	@CollectionTable(name ="incomeProofDocs" , joinColumns=@JoinColumn(name="id"))
	private List<String> incomeProofDocs = new ArrayList<String>();
	@ElementCollection
	@CollectionTable(name ="identityProofDocs" , joinColumns=@JoinColumn(name="id"))
	private List<String> identityProofDocs = new ArrayList<String>();
	@ElementCollection
	@CollectionTable(name ="addressProofDocs" , joinColumns=@JoinColumn(name="id"))
	private List<String> addressProofDocs = new ArrayList<String>();

	public Customer() {
	}

	public Customer(long id, long applicationNumber, String name, String password, long contact, long adhaar, String pancard, String email, String status, int loanAmount, int cibilScore, long income, String documentsVerified, List<String> incomeProofDocs, List<String> identityProofDocs, List<String> addressProofDocs) {
		this.id = id;
		this.applicationNumber = applicationNumber;
		this.username = name;
		this.password = password;
		this.contact = contact;
		this.adhaar = adhaar;
		this.pancard = pancard;
		this.email = email;
		this.status = status;
		this.loanAmount = loanAmount;
		this.cibilScore = cibilScore;
		this.income = income;
		this.documentsVerified = documentsVerified;
		this.incomeProofDocs = incomeProofDocs;
		this.identityProofDocs = identityProofDocs;
		this.addressProofDocs = addressProofDocs;
	}

	public Customer(long applicationNumber, String name, String password, long contact, long adhaar, String pancard, String email, String status, int loanAmount, int cibilScore, long income, String documentsVerified, List<String> incomeProofDocs, List<String> identityProofDocs, List<String> addressProofDocs) {
		this.applicationNumber = applicationNumber;
		this.username = name;
		this.password = password;
		this.contact = contact;
		this.adhaar = adhaar;
		this.pancard = pancard;
		this.email = email;
		this.status = status;
		this.loanAmount = loanAmount;
		this.cibilScore = cibilScore;
		this.income = income;
		this.documentsVerified = documentsVerified;
		this.incomeProofDocs = incomeProofDocs;
		this.identityProofDocs = identityProofDocs;
		this.addressProofDocs = addressProofDocs;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getApplicationNumber() {
		return applicationNumber;
	}

	public void setApplicationNumber(long applicationNumber) {
		this.applicationNumber = applicationNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getContact() {
		return contact;
	}

	public void setContact(long contact) {
		this.contact = contact;
	}

	public long getAdhaar() {
		return adhaar;
	}

	public void setAdhaar(long adhaar) {
		this.adhaar = adhaar;
	}

	public String getPancard() {
		return pancard;
	}

	public void setPancard(String pancard) {
		this.pancard = pancard;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(int loanAmount) {
		this.loanAmount = loanAmount;
	}

	public int getCibilScore() {
		return cibilScore;
	}

	public void setCibilScore(int cibilScore) {
		this.cibilScore = cibilScore;
	}

	public long getIncome() {
		return income;
	}

	public void setIncome(long income) {
		this.income = income;
	}

	public String getDocumentsVerified() {
		return documentsVerified;
	}

	public void setDocumentsVerified(String documentsVerified) {
		this.documentsVerified = documentsVerified;
	}

	public List<String> getIncomeProofDocs() {
		return incomeProofDocs;
	}

	public void setIncomeProofDocs(List<String> incomeProofDocs) {
		this.incomeProofDocs = incomeProofDocs;
	}

	public List<String> getIdentityProofDocs() {
		return identityProofDocs;
	}

	public void setIdentityProofDocs(List<String> identityProofDocs) {
		this.identityProofDocs = identityProofDocs;
	}

	public List<String> getAddressProofDocs() {
		return addressProofDocs;
	}

	public void setAddressProofDocs(List<String> addressProofDocs) {
		this.addressProofDocs = addressProofDocs;
	}
}
