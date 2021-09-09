import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent implements OnInit {
  title = 'emi';
  loanAmount: any = 0;
  annualIntRate:any = 0;
  tenure: any = 0;
  interest:any = 0;
  emi:any = 0;
  formatLoanAmt(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  ngOnChanges() {
    console.log("Hi")
  }
  formatAnnualInterestRate(value: number) {
    return value;
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Interest'],['Principal Amount']];
  public pieChartData: SingleDataSet = [70, 30];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  calculateInterest() {
    var p = this.loanAmount
    var r = this.annualIntRate

    this.interest =  Math.round((p * (1 + (r / 100)) ** this.tenure) - p)
    r = r/(12*100) // monthly
    var n = this.tenure * 12
    this.pieChartData = [this.interest, p]
    this.emi = Math.round(p * r * ((1+r)**n)/((1+r)**n - 1))
    if (this.emi === Infinity || isNaN(this.emi)) {
      this.emi = 0
    }

  }
}
