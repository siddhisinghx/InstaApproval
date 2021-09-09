import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-manager-approved',
  templateUrl: './manager-approved.component.html',
  styleUrls: ['./manager-approved.component.css']
})
export class ManagerApprovedComponent implements OnInit {

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
          return obj.status == "Approved by Manager";
        })
        setTimeout(() => {
          this.userData = res;
          this.rowData = this.userData;
        }, 50)


      })
  }

}
