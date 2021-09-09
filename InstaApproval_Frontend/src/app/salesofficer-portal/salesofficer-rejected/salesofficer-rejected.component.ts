import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-salesofficer-rejected',
  templateUrl: './salesofficer-rejected.component.html',
  styleUrls: ['./salesofficer-rejected.component.css']
})
export class SalesofficerRejectedComponent implements OnInit {


  constructor(private api: BankAuthorityService) {
  }

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
        res = res.filter((obj: any) => {
          return obj.status == "Rejected by SalesOfficer";
        })
        this.userData = res;
        this.rowData = this.userData;

      })
  }
}
