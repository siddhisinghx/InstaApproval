import { Component, OnInit } from '@angular/core';
import { BtnCellRendererComponent } from '../../btn-cell-renderer/btn-cell-renderer.component';
import { BankAuthorityService } from '../../shared/bank-authority.service';
import {EmailService} from "../../shared/email.service";

@Component({
  selector: 'app-supervisor-main',
  templateUrl: './supervisor-main.component.html',
  styleUrls: ['./supervisor-main.component.css']
})
export class SupervisorMainComponent implements OnInit {

  private gridApi: any;
  private columnApi: any;
  public totalLoan: number = 0;
  public totalApproved:number = 0;
  public totalPending:number = 0;
  public totalRejected:number = 0;
  public pendingPercent:number = 0;
  public pendingPercentWidth = { width: '0%'};

  constructor(private api: BankAuthorityService, private emailService: EmailService) { }

  activityLog: any = []

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
        if (params.value === 'Approved by Supervisor') {
          return { color: 'green' };
        } else if (params.value === 'pending') {
          return { color: 'rgb(255,204,0)' };
        } else if (params.value === "Request Raised to Manager") {
          return { color: '#007bff' };
        }
        return { color: 'red' };
      }
    },
    {
      field: "Action",
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
      if (i.status === "Approved by SalesOfficer" ) {
        i.status = "pending"
      }
      if (i.status === "Approved by Supervisor" ) {
        if (i.loanAmount > 500000) {
          i.status = "Request Raised to Manager"
        }
      }
    }
    data = data.filter((user:any)=>{return ((user.status==="Approved by Supervisor") || (user.status==="Rejected by Supervisor")
      || (user.status==="pending")  || (user.status==="Request Raised to Manager"))})
    return data;
  }


  getAllUser() {
    this.api.getCustomersUnderSupervisor()
      .subscribe((res:any) => {
        console.log(res[0].customersUnderSupervisor)
        this.userData = this.filterCurrentData(res[0].customersUnderSupervisor);
        this.rowData = this.userData;

        this.totalLoan = this.userData.filter((user:any)=>{return (user.status==="Approved by Supervisor")})
          .reduce((accumulator:number,currentUser:any)=>{
            return accumulator+currentUser.loanAmount;
          },0);

        this.totalApproved = this.userData.filter((user:any)=>{return (user.status==="Approved by Supervisor")}).length;
        this.totalPending = this.userData.filter((user:any)=>{return (user.status==="pending")}).length;
        this.totalRejected = this.userData.filter((user:any)=>{return (user.status==="Rejected by Supervisor")}).length;
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
    this.api.updateCustomerStatusBySupervisor(data,id)
      .subscribe(res=>{console.log(res)}, err=>{console.log(err)});
  }



  updateRequest(id: any, action: any) {
    this.currData = this.userData.filter((i: any) => { return (i.id === id) });
    if (action === "approve") {
      if ("Approved by Supervisor" === this.currData[0].status) {
        alert("Application is already Approved!")
        return;
      }
      if ( "Raised Request to Manager" === this.currData[0].status) {
        alert("Application is already sent for approval from the Manager!")
        return;
      }
    }
    else {
      if ("Rejected by Supervisor" === this.currData[0].status) {
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
        if (this.currData[0].loanAmount < 500000) {
          this.currData[0].status = "Approved by Supervisor";
          alert("LOAN HAS BEEN APPROVED!")
          this.sendEmail();
        } else {
          alert("SENDING TO MANAGER, AMT > 500000")
          this.currData[0].status = "Approved by Supervisor";
          // this.currData[0].status = "Raised Request to Manager";
          // Add this request to the manager database
          // var newUser = Object.assign({}, this.currData[0]);
          // newUser.status = "pending"
          this.raiseRequestToManager(this.currData[0]);
        }
      } else {
        this.currData[0].status = "Rejected by Supervisor";
      }

      // Updates status in user db - Viewed in sales officer portal
      this.updateUserStatus(this.currData[0],id);

      // update data and refresh tables
      var send = this.currData[0].status == "Approved by Supervisor" ? "approve" : "reject";
      this.api.updateCustomerStatusBySupervisor(send, id)
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

  raiseRequestToManager(user:any) {
    this.api.postRequestToManager(user)
      .subscribe(
        (res:any) => {
          console.log("Request to Manager raised. Log:" + res)
        }
      )
  }

}
