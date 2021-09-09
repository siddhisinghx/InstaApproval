import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-salesofficer-supervisorstatus',
  templateUrl: './salesofficer-supervisorstatus.component.html',
  styleUrls: ['./salesofficer-supervisorstatus.component.css']
})
export class SalesofficerSupervisorstatusComponent implements OnInit {


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
          console.log(obj)
          return ((obj.status==="Approved by Supervisor") || (obj.status==="Rejected by Supervisor")  || (obj.status === "Approved by SalesOfficer" && obj.loanAmount > 150000))})
        for (let i of res) {
          if (i.status === "Approved by SalesOfficer" ) {
            i.status = "pending"
          }
        }
        this.userData = res;
        this.rowData = this.userData;
      })
  }

}
