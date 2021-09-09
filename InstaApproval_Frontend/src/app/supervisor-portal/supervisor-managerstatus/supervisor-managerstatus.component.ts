import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-supervisor-managerstatus',
  templateUrl: './supervisor-managerstatus.component.html',
  styleUrls: ['./supervisor-managerstatus.component.css']
})
export class SupervisorManagerstatusComponent implements OnInit {

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
    this.api.getManagerStatus()
      .subscribe(res => {
        res = res[0].customersUnderManager
        console.log(res)
        for (let i of res) {
          if (i.status === "Approved by Supervisor" ) {
            i.status = "pending"
          }
        }
        res =  res.filter((obj:any) => {
          return ((obj.status==="Approved by Manager") || (obj.status==="Rejected by Manager")
            || (obj.status==="pending"))})
        this.userData = res;
        this.rowData = this.userData;

      })
  }
}
