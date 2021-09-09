import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-manager-pending',
  templateUrl: './manager-pending.component.html',
  styleUrls: ['./manager-pending.component.css']
})
export class ManagerPendingComponent implements OnInit {

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
    this.api.getCustomersUnderManager()
      .subscribe((res:any) => {
        res = res.filter((obj:any) => {
          console.log(obj.status)
          return obj.status == "Approved by Supervisor";
        })
        setTimeout(() => {
          this.userData = res;
          this.rowData = this.userData;
        }, 50)


      })
  }

}
