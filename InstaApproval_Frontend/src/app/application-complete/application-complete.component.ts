import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-complete',
  templateUrl: './application-complete.component.html',
  styleUrls: ['./application-complete.component.css']
})
export class ApplicationCompleteComponent implements OnInit {
  list = ['Hurray....!', 'Your application has been sent!', 'We hope to respond within 48 hours'];
  constructor() { }

  ngOnInit(): void {
  }

}
