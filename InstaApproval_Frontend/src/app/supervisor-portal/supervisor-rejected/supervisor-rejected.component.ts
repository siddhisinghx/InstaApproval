import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-supervisor-rejected',
  templateUrl: './supervisor-rejected.component.html',
  styleUrls: ['./supervisor-rejected.component.css']
})
export class SupervisorRejectedComponent implements OnInit {


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
      .subscribe(res => {
        res = res[0].customersUnderSupervisor
        res = res.filter((obj:any) => {
          return obj.status == "Rejected by Supervisor";
        })
        this.userData = res;
        this.rowData = this.userData;

      })
  }


}
