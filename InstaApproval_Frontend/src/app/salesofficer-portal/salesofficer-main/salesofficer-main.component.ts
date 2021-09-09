import { Component, OnInit } from '@angular/core';
import { BtnCellRendererComponent } from '../../btn-cell-renderer/btn-cell-renderer.component';
import {BankAuthorityService} from "../../shared/bank-authority.service";
import {EmailService} from "../../shared/email.service";

@Component({
  selector: 'app-salesofficer-main',
  templateUrl: './salesofficer-main.component.html',
  styleUrls: ['./salesofficer-main.component.css']
})
export class SalesofficerMainComponent implements OnInit {


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
    { field: 'id', sortable: true, filter: true, width: 100, sort: "asc" },
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
        if (params.value === 'Approved') {
          return { color: 'green' };
        } else if (params.value === 'pending') {
          return { color: 'rgb(255,204,0)' };
        } else if (params.value === 'Request Raised to Supervisor') {
          return { color: '#007bff' };
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
      if (i.status === "Approved by SalesOfficer" ) {
        if (i.loanAmount > 150000) {
          i.status = "Request Raised to Supervisor"
        } else {
          i.status = "Approved"
        }
      }
      if (i.status === "Rejected by SalesOfficer" ) {
        i.status = "Rejected"
      }
    }
    data = data.filter((user:any)=>{return ((user.status==="Approved") || (user.status==="Rejected")
      || (user.status==="pending") ||  (user.status==="Request Raised to Supervisor"))})
    return data;
  }


  getAllUser() {
    this.api.getCustomersUnderSalesOfficer()
      .subscribe(res => {
          console.log(res)
        this.userData = this.filterCurrentData(res);
        this.rowData = this.userData;

        this.totalLoan = this.userData.filter((user:any)=>{return (user.status==="Approved")})
          .reduce((accumulator:number,currentUser:any)=>{
            return accumulator+currentUser.loanAmount;
          },0);

        this.totalApproved = this.userData.filter((user:any)=>{return (user.status==="Approved")}).length;
        this.totalPending = this.userData.filter((user:any)=>{return (user.status==="pending")}).length;
        this.totalRejected = this.userData.filter((user:any)=>{return (user.status==="Rejected")}).length;
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


  updateRequest(id: any, action: any) {
    this.currData = this.userData.filter((i: any) => { return (i.id === id) });
    if (action === "approve") {
      if ("Approved" === this.currData[0].status) {
        alert("Application is already Approved!")
        return;
      }
      if ( "Request Raised to Supervisor" === this.currData[0].status) {
        alert("Application is already sent for approval from the Supervisor!")
        return;
      }
    }
    else {
      if ("Rejected" === this.currData[0].status) {
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
        if (this.currData[0].loanAmount < 150000) {
          this.currData[0].status = "Approved";
          alert("LOAN HAS BEEN APPROVED!!")
          this.sendEmail();
        } else {
          alert("SENDING TO SUPERVISOR, AMT > 150000")
          this.currData[0].status = "Approved";

          // this.currData[0].status = "raisedrequesttosupervisor";
          // var newUser = Object.assign({}, this.currData[0]);
          // newUser.status = "pending"
          this.raiseRequestToSupervisor(this.currData[0]);
        }
      } else {
        this.currData[0].status = "Rejected";
      }
      // update data and refresh tables
      var send = this.currData[0].status == "Approved" ? "approve" : "reject";
      if (send === "reject") {
        this.checkAfterReject(this.currData[0]);
      }
      this.api.updateCustomerStatusBySalesOfficer(send, id)
        .subscribe(res => {
          this.userData = res;
          this.rowData = this.userData;
          this.gridApi.applyTransaction({ add: this.getAllUser() });
        })
      this.activityLog.push("Application for Customer " + this.currData[0].username + " with total loan amount of Rs. " + this.currData[0].loanAmount + " " + this.currData[0].status)
    }
  }

  raiseRequestToSupervisor(user:any) {
    this.api.postRequestToSupervisor(user)
      .subscribe(
        (res:any) => {
          console.log("Request to Supervisor raised. Log:" + res)
        }
      )
  }

  sendEmail(){
    this.emailService.sendHtmlApprovedEmail().subscribe(data =>{console.log(data);},
      error => console.log(error));
  }

  checkAfterReject(data:any) {
    if (data.loanAmount > 500000) {
      this.api.removeCustomerFromManagerList(data);
    }
    if (data.loanAmount > 150000) {
      this.api.removeCustomerFromSupervisorList(data);
    }
  }


}
