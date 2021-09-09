import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-supervisor-approved',
  templateUrl: './supervisor-approved.component.html',
  styleUrls: ['./supervisor-approved.component.css']
})
export class SupervisorApprovedComponent implements OnInit {


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
    this.api.getCustomersUnderSupervisor()
      .subscribe((res: any[]) => {
        res = res[0].customersUnderSupervisor
        res = res.filter((obj:any) => {
          return obj.status == "Approved by Supervisor";
        })
        this.userData = res;
        this.rowData = this.userData;
      })
  }


}
