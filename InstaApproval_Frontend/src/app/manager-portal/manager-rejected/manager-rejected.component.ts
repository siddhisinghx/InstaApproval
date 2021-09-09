import { Component, OnInit } from '@angular/core';
import { BankAuthorityService } from 'src/app/shared/bank-authority.service';

@Component({
  selector: 'app-manager-rejected',
  templateUrl: './manager-rejected.component.html',
  styleUrls: ['./manager-rejected.component.css']
})
export class ManagerRejectedComponent implements OnInit {

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
          return obj.status == "Rejected by Manager";
        })
        setTimeout(() => {
          this.userData = res;
          this.rowData = this.userData;
          }, 50)


      })
  }

}
