import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-salesofficer-approved',
  templateUrl: './salesofficer-approved.component.html',
  styleUrls: ['./salesofficer-approved.component.css']
})
export class SalesofficerApprovedComponent implements OnInit {



  constructor(private api: BankAuthorityService) { }
  currData: any;
  userData: any;
  rowData: any;

  ngOnInit(): void {
    this.getAllUser();
  }
  ngOnChanges(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        res = res[0].customersUnderSalesOfficer
        res = res.filter((obj:any) => {
          return obj.status == "Approved by SalesOfficer";
        })
        this.userData = res;
        this.rowData = this.userData;

      })
  }

}
