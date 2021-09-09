import { Component, OnDestroy, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { BankAuthorityService } from "../shared/bank-authority.service";


@Component({
  selector: "btn-cell-renderer",
  template: `
    <button value = "id" (click)="btnClickedHandler($event)" class="btn btn-success">Approve</button>
    <button (click)="btnClickedHandler2($event)" class="btn btn-danger">Reject</button>
  `
})
export class BtnCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    throw new Error("Method not implemented.");
  }
  clicked: any = false
  data: any;
  // {{params.value}}

  constructor(private api: BankAuthorityService) { }
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(params: any) {
    this.clicked = true
    this.params.clicked(this.params.data);
  }

  btnClickedHandler2(params: any) {
    this.clicked = true
    this.params.clicked2(this.params.data);
  }
  rowD: any;
  userD: any;

  ngOnInit(): void {
    this.getAllUser();

  }

  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        this.userD = res;
        this.rowD = this.userD;
        return this.rowD;

      })
  }

  ngOnDestroy() {//
  }
}
