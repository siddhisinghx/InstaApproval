import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  applicationForm!: FormGroup;

  constructor(private fb: FormBuilder,private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      contact: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern("[789][0-9]*")]],
      adhaar: ['',[Validators.required, Validators.minLength(12),Validators.maxLength(12),Validators.pattern("[0-9]*")]],
      pancard:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      email: ['',[Validators.required,Validators.email]],
      loanAmount: ['',[Validators.required, Validators.min(10000)]]
    })
  }

  saveCustomer(){
    this.customerService.createCustomer(this.customer).subscribe( data =>{
      console.log(data);
      this.goToCustomerList();
    },
    error => console.log(error));
  }

  goToCustomerList(){
    this.router.navigate(['/customers']);
  }
  
  onSubmit(){
    console.log(this.customer);
    this.saveCustomer();
  }

  get controls() { return this.applicationForm.controls;}

}
