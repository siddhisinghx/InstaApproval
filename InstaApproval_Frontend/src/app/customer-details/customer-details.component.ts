import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../shared/customer.service';
import { DocURLService } from '../shared/doc-url.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  id!: number;
  customer!: Customer;
  constructor(private route: ActivatedRoute, private employeService: CustomerService,private docUrlService: DocURLService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.customer = new Customer();
    this.employeService.getCustomerById(this.id).subscribe( data => {
      this.customer = data;
    });
  }

}
