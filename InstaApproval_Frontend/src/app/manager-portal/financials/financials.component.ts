import { Component, OnInit } from '@angular/core';
import {BankAuthorityService} from "../../shared/bank-authority.service";
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {
    SingleDataSet,
    Label,
    monkeyPatchChartJsLegend,
    monkeyPatchChartJsTooltip,
    Color,
    MultiDataSet
} from 'ng2-charts';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.css']
})
export class FinancialsComponent implements OnInit {
    private data: any;


    constructor(private api: BankAuthorityService) {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

  ngOnChanges(): void {
  }

  async calcStatusOfEach() {
        await this.getAllUser();
        setTimeout(() => {
            this.pieChartData = this.generatePieData();
            this.bubbleChartData = this.generateBubbleData();
            this.generateLineData();
            this.generateBarChartData();
            }, 240)
  }

    getAllUser() {
        this.api.getAllUsers()
            .subscribe(res => {
                this.userData = res.slice(3,res.length);
                this.rowData = this.userData;
            })

    }

  generateLineData() {
      var acceptedbysalesofficer = [0,0,0,0,0,0,0,0,0];
      var acceptedbysupervisor = [0,0,0,0,0,0,0,0,0];
      var acceptedbymanager = [0,0,0,0,0,0,0,0,0];
      var rejectedbysalesofficer = [0,0,0,0,0,0,0,0,0];
      var rejectedbysupervisor = [0,0,0,0,0,0,0,0,0];
      var rejectedbymanager = [0,0,0,0,0,0,0,0,0];
      for (let i of this.customerData) {
          console.log(i.status)
          switch (i.status) {
              case "Approved by SalesOfficer":
                  console.log("Yo")
                  acceptedbysalesofficer[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
              case "Approved by Supervisor":
                  acceptedbysupervisor[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
              case "Approved by Manager":
                  acceptedbymanager[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
              case "Rejected by SalesOfficer":
                  rejectedbysalesofficer[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
              case "Rejected by Supervisor":
                  rejectedbysupervisor[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
              case "Rejected by Manager":
                  rejectedbymanager[i.statusChangedAt.getMonth() - 1] += i.loanAmount;
                  break;
          }
      }
      for (let i of this.userData) {
            // Check for Current Data
          switch (i.status) {
              case "Approved by SalesOfficer":
                  acceptedbysalesofficer[8] += i.loanAmount;
                  break;
              case "Approved by Supervisor":
                  acceptedbysupervisor[8] += i.loanAmount;
                  break;
              case "Approved by Manager":
                  acceptedbymanager[8] += i.loanAmount;
                  break;
          }
      }



      var j = 0;
      // Set Quarterly results
      for (var i = 0; i < 9; i += 3) {
          this.q[j] = acceptedbysalesofficer[i] + acceptedbysalesofficer[i + 1] + acceptedbysalesofficer[i + 2] +
                        acceptedbysupervisor[i] + acceptedbysupervisor[i + 1] + acceptedbysupervisor[i + 2] +
                        acceptedbymanager[i] + acceptedbymanager[i + 1] + acceptedbymanager[i + 2];
          j += 1;
      }

      this.doughnutChartData = [this.q];

      this.lineChartData = [
          { data: acceptedbysalesofficer, label: 'Total Amount Approved by SalesOfficer' },
          { data: acceptedbysupervisor, label: 'Total Amount Approved by Supervisor' },
          { data: acceptedbymanager, label: 'Total Amount Approved by Manager' },
      ]

  }
    public q = [0, 0, 0]


    generateBarChartData() {
        var accepted = [0,0,0,0,0,0,0,0,0];
        var rejected = [0,0,0,0,0,0,0,0,0];
        for (let i of this.customerData) {
            switch (i.status) {
                case "Approved by SalesOfficer":
                    accepted[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
                case "Approved by Supervisor":
                    accepted[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
                case "Approved by Manager":
                    accepted[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
                case "Rejected by SalesOfficer":
                    rejected[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
                case "Rejected by Supervisor":
                    rejected[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
                case "Rejected by Manager":
                    rejected[i.statusChangedAt.getMonth() - 1] += 1;
                    break;
            }
        }
        for (let i of this.userData) {
            switch (i.status) {
                case "Approved by SalesOfficer":
                    accepted[8] += 1;
                    break;
                case "Approved by Supervisor":
                    accepted[8] += 1;
                    break;
                case "Approved by Manager":
                    accepted[8] += 1;
                    break;
                case "Rejected by SalesOfficer":
                    rejected[8] += 1;
                    break;
                case "Rejected by Supervisor":
                    rejected[8] += 1;
                    break;
                case "Rejected by Manager":
                    rejected[8] += 1;
                    break;
            }
        }
        this.barChartData = [
            { data: accepted, label: 'Accepted Requests per Month' },
            { data: rejected, label: 'Rejected Requests per Month' }
        ]
    }

  generateBubbleData() {
        var d:any = {}
        var data:any = []
      for (let i of this.customerData) {
          data.push({x: i.cibilScore, y: Math.round(i.loanAmount/101.2), r: 10})
      }
          var res = [
              {
                  data: data,
                  label: 'Investment Equities',
              },
          ];
          console.log(res)
          return res;
      }


generatePieData() {
        var stats = [0, 0, 0, 0]
        for (let i of this.userData) {
            switch (i.status) {
                case "pending":
                    stats[0] += 1
                    break;
                case "Approved by SalesOfficer":
                    stats[1] += 1
                    break;
                case "Approved by Supervisor":
                    stats[2] += 1
                    break;
                case "Approved by Manager":
                    stats[3] += 1
                    break;
            }
        }
        return stats;
  }



    rowData: any;
    userData: any;
    ngOnInit(): void {
        this.getAllUser();
        this.calcStatusOfEach();
    }


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
        {backgroundColor: 'rgba(244,171,48,0.9)'},
      {backgroundColor: 'rgba(92,99,162,0.9)'},
      {backgroundColor: 'rgba(236, 113, 118, 0.9)'},
        {backgroundColor: 'rgba(89, 25, 148, 0.742)'}
    ];

  barChartData: ChartDataSets[] = [
      { data: [45, 37, 60, 70, 46, 33,11,13,45], label: 'Best Fruits' },
      { data: [45, 37, 60, 70, 46, 33,11,13,45], label: 'Best Fruits' }

  ];


  lineChartData: ChartDataSets[] = [];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

  lineChartOptions = {
    responsive: true,
      bezierCurve : false
  };

  lineChartColors: Color[] = [
      {backgroundColor: 'rgba(92,99,162,0.9)'},
      {backgroundColor: 'rgba(236, 113, 118, 0.9)'},
      {backgroundColor: 'rgba(244,171,48,0.9)'},
      {backgroundColor: 'rgba(89, 25, 148, 0.742)'}
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType:ChartType = 'line';



    public bubbleChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 1000,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'CREDIT SCORE'
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 10000
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Loan Amount Requested in INR'
                }
            }]
        },
        title: {
            display: true,
            text: 'Credit Score vs Loan Amount Requested in INR'
        }
    };
    public bubbleChartType: ChartType = 'bubble';
    public bubbleChartLegend = true;

    public bubbleChartData: ChartDataSets[] = [

        {
            data: [
                { x: 15, y: 15, r: 15 },
                { x: 25, y: 15, r: 25 },
                { x: 36, y: 12, r: 33 },
                { x: 10, y: 18, r: 18 },
            ],
            label: 'Cibil Score vs Loan Amount Requested in INR',
        },
    ];

    public bubbleChartColors: Array<any> = [
        {
            backgroundColor: ['rgba(236, 113, 118, 0.9)', '#2b5fad', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['rgba(226,132,136,0.9)', '#5aadd3', '#FFC870', '#A8B3C5', '#616774'],
            borderWidth: 2,
        }
    ];



    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
    public pieChartLabels: Label[] = [['Pending'], ['Approved by SalesOfficer'], 'Approved by Supervisor', 'Approved by Manager'];
    public pieChartData: SingleDataSet = [30, 50, 20];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public pieChartColors: Array<any> = [
        {
            backgroundColor: ['rgba(236, 113, 118, 0.9)', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['rgba(226,132,136,0.9)', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
            borderWidth: 2,
        }
    ];


    doughnutChartLabels: Label[] = ['Q1', 'Q2', 'Q3'];
    doughnutChartData: MultiDataSet = [
        [55, 25, 20]
    ];
    doughnutChartType: ChartType = 'doughnut';









    private customerData:any = [
        {
            "applicationNumber": 101,"username": "JohnDoe", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "LLERT5412W","status": "Rejected by Manager","loanAmount": 900000, "cibilScore": 106, "income": 680000, "statusChangedAt": new Date(2021, 1, 2)},
        {
            "applicationNumber": 101,"username": "JohnDoe", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "LLERT5412W","status": "Approved by Manager","loanAmount": 660000, "cibilScore": 886, "income": 680000, "statusChangedAt": new Date(2021, 1, 2)},
        {
            "applicationNumber": 101,"username": "JohnDoe", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "LLERT5412W","status": "Rejected by Manager","loanAmount": 900000, "cibilScore": 106, "income": 680000, "statusChangedAt": new Date(2021, 1, 2)},
        {
            "applicationNumber": 101,"username": "JohnDoe", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "LLERT5412W","status": "Approved by SalesOfficer","loanAmount": 30000, "cibilScore": 306, "income": 680000, "statusChangedAt": new Date(2021, 1, 2)},
        {
            "applicationNumber": 101,"username": "JohnDoe", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "LLERT5412W","status": "Approved by Supervisor","loanAmount": 400000, "cibilScore": 609, "income": 680000, "statusChangedAt": new Date(2021, 1, 2)},
        {
            "applicationNumber": 102,"username": "ManikaArora", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 722000, "cibilScore": 973, "income": 102000, "statusChangedAt": new Date(2021, 2, 11)},
        {
            "applicationNumber": 102,"username": "ManikaArora", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 102000, "cibilScore": 511, "income": 102000, "statusChangedAt": new Date(2021, 2, 11)},
        {
            "applicationNumber": 102,"username": "ManikaArora", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 300000, "cibilScore": 704, "income": 102000, "statusChangedAt": new Date(2021, 2, 11)},
        {
            "applicationNumber": 102,"username": "ManikaArora", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 102000, "cibilScore": 511, "income": 102000, "statusChangedAt": new Date(2021, 2, 11)},
        {
            "applicationNumber": 103,"username": "Dhruvmalik", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 60000, "cibilScore": 430, "income": 605000, "statusChangedAt": new Date(2021, 3, 6)},
        {
            "applicationNumber": 103,"username": "Dhruvmalik", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 250000, "cibilScore": 530, "income": 605000, "statusChangedAt": new Date(2021, 3, 6)},
        {
            "applicationNumber": 103,"username": "Dhruvmalik", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 220000, "cibilScore": 6110, "income": 605000, "statusChangedAt": new Date(2021, 3, 6)},
        {
            "applicationNumber": 104,"username": "MuskanGhalot", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 644000, "cibilScore": 970, "income": 1100000, "statusChangedAt": new Date(2021, 3, 7)},
        {
            "applicationNumber": 105,"username": "RiyaSingh", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 900000, "cibilScore": 963, "income": 900000, "statusChangedAt": new Date(2021, 3, 18)},
        {
            "applicationNumber": 106,"username": "RiyaYadav", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Manager","loanAmount": 702000, "cibilScore": 579, "income": 702000, "statusChangedAt": new Date(2021, 4, 8)},
        {
            "applicationNumber": 107,"username": "RonMalik", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Supervisor","loanAmount": 705000, "cibilScore": 711, "income": 650000, "statusChangedAt": new Date(2021, 4, 24)},
        {
            "applicationNumber": 108,"username": "HarshBatra", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by SalesOfficer","loanAmount": 67000, "cibilScore": 205, "income": 850000, "statusChangedAt": new Date(2021, 4, 27)},
        {
            "applicationNumber": 109,"username": "JahnviMatra", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Supervisor","loanAmount": 990000, "cibilScore": 932, "income": 1150000, "statusChangedAt": new Date(2021, 4, 28)},
        {
            "applicationNumber": 110,"username": "VenkatPrasad", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 430000, "cibilScore": 680, "income": 600000, "statusChangedAt": new Date(2021, 4, 29)},
        {
            "applicationNumber": 111,"username": "VakulDev", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 900000, "cibilScore": 971, "income": 800000, "statusChangedAt": new Date(2021, 4, 30)},
        {
            "applicationNumber": 112,"username": "RashiSingh", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 810000, "cibilScore": 960, "income": 1200000, "statusChangedAt": new Date(2021, 5, 3)},
        {
            "applicationNumber": 113,"username": "KhyatiKohli", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 200000, "cibilScore": 452, "income": 500000, "statusChangedAt": new Date(2021, 5, 16)},
        {
            "applicationNumber": 114,"username": "KshitijAhuja", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 210000, "cibilScore": 421, "income": 102000, "statusChangedAt": new Date(2021, 5, 17)},
        {
            "applicationNumber": 115,"username": "VarnikaYadav", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 700000, "cibilScore": 511, "income": 320000, "statusChangedAt": new Date(2021, 5, 18)},
        {
            "applicationNumber": 116,"username": "DevikaAnand", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 72000, "cibilScore": 621, "income": 640000, "statusChangedAt": new Date(2021, 6, 24)},
        {
            "applicationNumber": 116,"username": "DevikaAnand", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 142000, "cibilScore": 692, "income": 640000, "statusChangedAt": new Date(2021, 6, 25)},
        {
            "applicationNumber": 116,"username": "DevikaAnand", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 132000, "cibilScore": 590, "income": 640000, "statusChangedAt": new Date(2021, 6, 26)},
        {
            "applicationNumber": 116,"username": "DevikaAnand", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 148000, "cibilScore": 700, "income": 640000, "statusChangedAt": new Date(2021, 6, 28)},
        {
            "applicationNumber": 117,"username": "SaloniJain", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 465000, "cibilScore": 811, "income": 2250000, "statusChangedAt": new Date(2021, 6, 28)},
        {
            "applicationNumber": 118,"username": "VanishreePrasad", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Supervisor","loanAmount": 700000, "cibilScore": 675, "income": 41000, "statusChangedAt": new Date(2021, 6, 29)},
        {
            "applicationNumber": 119,"username": "AkshitaChander", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 70000, "cibilScore": 511, "income": 780000, "statusChangedAt": new Date(2021, 7, 11)},
        {
            "applicationNumber": 120,"username": "AnweshaRoy", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 802000, "cibilScore": 824, "income": 750000, "statusChangedAt": new Date(2021, 7, 14)},
        {
            "applicationNumber": 121,"username": "KajalChaudhary", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 870000, "cibilScore": 665, "income": 870000, "statusChangedAt": new Date(2021, 7, 15)},
        {
            "applicationNumber": 122,"username": "Amanprasad", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 102000, "cibilScore": 111, "income": 440000, "statusChangedAt": new Date(2021, 7, 24)},
        {
            "applicationNumber": 123,"username": "AbhishekChaudhary", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Supervisor","loanAmount": 300000, "cibilScore": 271, "income": 223000, "statusChangedAt": new Date(2021, 7, 29)},
        {
            "applicationNumber": 124,"username": "ShubhamChauhan", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by SalesOfficer","loanAmount": 47000, "cibilScore": 423, "income": 670000, "statusChangedAt": new Date(2021, 8, 1)},
        {
            "applicationNumber": 125,"username": "TanyaGhosh", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by Supervisor","loanAmount": 160000, "cibilScore": 511, "income": 1160000, "statusChangedAt": new Date(2021, 8, 2)},
        {
            "applicationNumber": 126,"username": "AdityaMishra", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 170000, "cibilScore": 211, "income": 150000, "statusChangedAt": new Date(2021, 8, 6)},
        {
            "applicationNumber": 127,"username": "UtkarshSharma", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Rejected by SalesOfficer","loanAmount": 120000, "cibilScore": 106, "income": 20000, "statusChangedAt": new Date(2021, 8, 20)},
        {
            "applicationNumber": 128,"username": "AnjaliRoongta", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Manager","loanAmount": 850000, "cibilScore": 811, "income": 790000, "statusChangedAt": new Date(2021, 8, 24)},
        {
            "applicationNumber": 129,"username": "MahiKaushik", "password": "password","contact": 9988776655,"email": "johndoe@gmail.com","adhaar": 998789753122,
            "pancard": "WUTBB8870P","status": "Approved by Supervisor","loanAmount": 95000, "cibilScore": 303, "income": 820000, "statusChangedAt": new Date(2021, 8, 25)},

    ]
}
