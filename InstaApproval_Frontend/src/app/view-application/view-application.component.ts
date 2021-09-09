import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../shared/customer.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  loggedInCustomer = new Customer();
  applied = false;
  loggedInUserId: any;
  constructor(private tokenStorage:TokenStorageService, private customerService:CustomerService) { }

  ngOnInit(): void {
    const data = this.tokenStorage.getUser();
    this.loggedInUserId = data.id;
    this.customerService.getCustomersList().subscribe(data=>{
      const list = data.filter((customer)=>{return customer.id === this.loggedInUserId});
      this.loggedInCustomer = list[0];
      if(this.loggedInCustomer.applicationNumber!=0){
        this.applied = true;
      }
    })
  }



}
