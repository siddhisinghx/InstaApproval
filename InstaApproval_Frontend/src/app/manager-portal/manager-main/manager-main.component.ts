import { Component, OnInit } from '@angular/core';
import { BtnCellRendererComponent } from '../../btn-cell-renderer/btn-cell-renderer.component';
import { BankAuthorityService } from '../../shared/bank-authority.service';
import {EmailService} from "../../shared/email.service";

@Component({
  selector: 'app-manager-main',
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css']
})
export class ManagerMainComponent implements OnInit {

  private gridApi: any;
  private columnApi: any;
  public totalLoan: number = 0;
  public totalApproved:number = 0;
  public totalPending:number = 0;
  public totalRejected:number = 0;
  public pendingPercent:number = 0;
  public pendingPercentWidth = { width: '0%'};

  constructor(private api: BankAuthorityService, private emailService: EmailService) { }

  activityLog: any = ["Received Request from Sales Officer Level 1 : Divya", "Received Request from Supervisor Level 2 : Manmayi"]

  rowData: any;
  userData: any;
  ngOnInit(): void {
    this.getAllUser();
  }
  onGridReady(params: any) {
    this.gridApi = params.api
    this.columnApi = params.columnApi
  }
  ngOnChanges(): void {
    this.getAllUser();
  }

  columnDefs = [
    { field: 'id', sortable: true, filter: true, width: 100,sort: "asc" },
    { field: 'username', sortable: true, filter: true },
    { field: 'contact', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'pancard', sortable: true, filter: true },
    { field: 'adhaar', sortable: true, filter: true },
    { field: 'loanAmount', sortable: true, filter: true, width: 150 },
    { field: 'documentsVerified', sortable: true, filter: true },
    { field: 'cibilScore', sortable: true, filter: true, width: 150 },
    {
      field: 'status', sortable: true, filter: true, cellStyle: (params: any) => {
        if (params.value === 'Approved by Manager') {
          return { color: 'green' };
        } else if (params.value === 'pending') {
          return { color: 'rgb(255,204,0)' };
        }
        return { color: 'red' };
      }
    },
    {
      field: "id",
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked: (field: any) => this.j(field),
        clicked2: (field: any) => this.k(field),
      },
    }
  ];



  frameworkComponents = {
    btnCellRenderer: BtnCellRendererComponent
  };
  currData: any;

  j(field: any) {
    this.updateRequest(field.id, "approve");
  }

  k(field: any) {
    this.updateRequest(field.id, "rejected");
  }

  filterCurrentData(data:any) {
    for (let i of data) {
      if (i.status === "Approved by Supervisor" ) {
        i.status = "pending"
      }
    }
    data = data.filter((user:any)=>{return ((user.status==="Approved by Manager") || (user.status==="Rejected by Manager") || (user.status==="pending"))})
    return data;
  }


  getAllUser() {
    this.api.getRequestToManager()
      .subscribe(res => {
        this.userData = this.filterCurrentData(res[0].customersUnderManager);
        this.rowData = this.userData;

        this.totalLoan = this.userData.filter((user:any)=>{return (user.status==="Approved by Manager")})
          .reduce((accumulator:number,currentUser:any)=>{
            return accumulator+currentUser.loanAmount;
          },0);

        this.totalApproved = this.userData.filter((user:any)=>{return (user.status==="Approved by Manager")}).length;
        this.totalPending = this.userData.filter((user:any)=>{return (user.status==="pending")}).length;
        this.totalRejected = this.userData.filter((user:any)=>{return (user.status==="Rejected by Manager")}).length;
        this.pendingPercent = Math.round(this.totalPending / this.userData.length * 100);

        if(this.pendingPercent == 0){
          this.pendingPercentWidth.width = '0%';
        }
        else if(this.pendingPercent <= 35){
          this.pendingPercentWidth.width = '35%';
        }else{
          this.pendingPercentWidth.width = `${this.pendingPercent}%`;
        }
      })
  }

  updateUserStatus(data:any, id:number){
    //update user db - sales officer
    if (data.status == "Approved by Manager") {
      this.api.updateCustomerStatusByManager("approve", id)
        .subscribe(res=>{}, err=>{console.log(err)});
    } else {
      this.api.updateCustomerStatusByManager("reject", id)
        .subscribe(res=>{}, err=>{console.log(err)});
    }


    //update supervisor requests db
    this.api.updateRequestToSupervisor(data,id)
      .subscribe(res=>{}, err=>{console.log(err)});
    // this.getAllUser();
  }



  updateRequest(id: any, action: any) {
    this.currData = this.userData.filter((i: any) => { return (i.id === id) });

    // Check if same button is pressed as current status
    if (action === "approve") {
      if ("Approved by Manager" === this.currData[0].status) {
        alert("Application is already Approved!")
        return;
      }
    }
    else {
      if ("Rejected by Manager" === this.currData[0].status) {
        alert("Application is already Rejected!")
        return;
      }
    }

    if (this.currData[0].documentsVerified === "pending") {
      alert("DOCUMENTS NOT VERIFIED YET, PLEASE WAIT...")
      return;
    }


    if (confirm("Are you sure you want to " + action + "?" +
      "\nName: " + this.currData[0].username +
      "\nLoan Amount: " + this.currData[0].loanAmount)) {

      if (action === "approve") {
        this.currData[0].status = "Approved by Manager";
        alert("Hooray, Application has been processed completely! :)");
        this.sendEmail();
      } else {
        this.currData[0].status = "Rejected by Manager";
      }

      // Updates status in user db - Viewed in sales officer portal & supervisor portal
      this.updateUserStatus(this.currData[0],id);
      // update data and refresh tables
      var send = this.currData[0].status == "Approved by Manager" ? "approve" : "reject";
      this.api.updateRequestToManager(send, id)
        .subscribe((res:any) => {
          this.userData = res;
          this.rowData = this.userData;
          this.gridApi.applyTransaction({ add: this.getAllUser() });
        })
      this.activityLog.push("Application for Customer " + this.currData[0].username + " with total loan amount of Rs. " + this.currData[0].loanAmount + " " + this.currData[0].status)
    }
  }

  sendEmail(){
    this.emailService.sendHtmlApprovedEmail().subscribe(data =>{console.log(data);},
      error => console.log(error));
  }

}















