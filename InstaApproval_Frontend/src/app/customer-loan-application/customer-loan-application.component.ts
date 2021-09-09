import {BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../shared/customer.service';
import { DocURLService } from '../shared/doc-url.service';
import { EmailService } from '../shared/email.service';
import {map} from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { BankAuthorityService } from '../shared/bank-authority.service';

declare var $: any;

@Component({
  selector: 'app-customer-loan-application',
  templateUrl: './customer-loan-application.component.html',
  styleUrls: ['./customer-loan-application.component.css'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue:{
        showError: true
      }
    }
  ]
})
export class CustomerLoanApplicationComponent implements OnInit {
  panel1OpenState = false;
  panel2OpenState = false;
  panel3OpenState = false;
  stepperOrientation!: Observable<StepperOrientation>;

  personalDetailsFormGroup!: FormGroup;
  incomeProofFormGroup!: FormGroup;
  identityProofFormGroup!: FormGroup;
  addressProofFormGroup!: FormGroup;

  incomeFiles:any = [];
  identityFiles:any = [];
  addressFiles:any = [];

  displayFileData = {
    "id" : 0,
    "fileName": "",
    "url": ""
  };

  customer: Customer = new Customer;
  fileToBeDeleted: any;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer, private tokenStorage:TokenStorageService, private customerService:CustomerService,
    private emailService: EmailService,private bankAuthorityService:BankAuthorityService,private docUrlService:DocURLService, private router:Router, breakpointObserver: BreakpointObserver) { 
      this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  loggedInUserId:any; 
  ngOnInit(): void {
    //get logged in customer
    this.getLoggedInCustomer();

    this.personalDetailsFormGroup = this.fb.group({
      contact: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern("[789][0-9]*")]],
      adhaar: ['',[Validators.required, Validators.minLength(12),Validators.maxLength(12),Validators.pattern("[0-9]*")]],
      pancard:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      income: ['', [Validators.required,Validators.pattern("[0-9]*")]],
      loanAmount: ['',[Validators.required, Validators.min(10000),Validators.pattern("[0-9]*")]]
    })

    this.incomeProofFormGroup = this.fb.group({
      incomeFiles: [this.incomeFiles, [Validators.required, Validators.minLength(1)]]
    });
    this.identityProofFormGroup = this.fb.group({
      identityFiles: [this.identityFiles, [Validators.required, Validators.minLength(1)]]
    });
    this.addressProofFormGroup = this.fb.group({
      addressFiles: [this.addressFiles, [Validators.required, Validators.minLength(1)]]
    });

  }

  getLoggedInCustomer(){
    const data = this.tokenStorage.getUser();
    this.loggedInUserId = data.id;
    this.customerService.getCustomersList().subscribe(data=>{
      const list = data.filter((customer)=>{return customer.id === this.loggedInUserId});
      this.customer = list[0];
      this.customer.applicationNumber = Math.floor(100000 + Math.random() * 900000);
      console.log(this.customer);
    })
  }

  ngOnChanges(){
    this.incomeProofFormGroup.get("incomeFiles")?.updateValueAndValidity();
  }

  get personalFormcontrols() { return this.personalDetailsFormGroup.controls;}

  incomeFileUpload(event:any){
    var files = event.target.files;
    if(files){
      for (let i = 0; i < files.length; i++) {
        const name = this.customer.applicationNumber+"_incDoc_"+(this.incomeFiles.length+1);
  
        //Adding file names and urls to json
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
          const fileData = {
            "fileName" : name,
            "url" : reader.result+ ''
          }
          this.addDocumentToJson(fileData);
        });
        reader.readAsDataURL(files[i]);

        const file = {
          "name" : name,
          "type" : files[i].type,
          "size" : this.formatBytes(files[i].size)
        };
        this.incomeFiles.push(file);
      }
    }
    event.srcElement.value = null;
  }

  identityFileUpload(event:any){
    var files = event.target.files;
    if(files){
      for (let i = 0; i < files.length; i++) {
        const name = this.customer.applicationNumber+"_idDoc_"+(this.identityFiles.length+1);
  
        //Adding file names and urls to json
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
          const fileData = {
            "fileName" : name,
            "url" : reader.result+ ''
          }
          this.addDocumentToJson(fileData);
        });
        reader.readAsDataURL(files[i]);

        const file = {
          "name" : name,
          "type" : files[i].type,
          "size" : this.formatBytes(files[i].size)
        };
        this.identityFiles.push(file);
      }
    }
    event.srcElement.value = null;
  }

  addressFileUpload(event:any){
    var files = event.target.files;
    if(files){
      for (let i = 0; i < files.length; i++) {      
        const name = this.customer.applicationNumber+"_addDoc_"+(this.addressFiles.length+1);
  
        //Adding file names and urls to json
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
          const fileData = {
            "fileName" : name,
            "url" : reader.result+ ''
          }
          this.addDocumentToJson(fileData);
        });
        reader.readAsDataURL(files[i]);

        const file = {
          "name" : name,
          "type" : files[i].type,
          "size" : this.formatBytes(files[i].size)
        };
        this.addressFiles.push(file);
      }
    }
    event.srcElement.value = null;
  }

  deleteIncomeFile(file:any){
    const index = this.incomeFiles.indexOf(file);
    this.deleteDocumentFromJson(file.name);
    this.incomeFiles.splice(index,1);
  }

  deleteIdentityFile(file:any){
    const index = this.identityFiles.indexOf(file);
    this.deleteDocumentFromJson(file.name);
    this.identityFiles.splice(index,1);
  }

  deleteAddressFile(file:any){
    const index = this.addressFiles.indexOf(file);
    this.deleteDocumentFromJson(file.name);
    this.addressFiles.splice(index,1);
  }

  
  displayFile(fileName:string){
    $("#docDisplayModal" as any).modal('show');

    this.docUrlService.getDocumentByFileName(fileName).subscribe(data=>{
      this.displayFileData = data[0];
    });
  }

  closeDocumentModal(){
    $("#docDisplayModal" as any).modal('toggle');
  }

  submitApplication(){
    this.customer.contact = this.personalDetailsFormGroup.get("contact")?.value;
    this.customer.adhaar = this.personalDetailsFormGroup.get("adhaar")?.value;
    this.customer.pancard = this.personalDetailsFormGroup.get("pancard")?.value;
    this.customer.income = this.personalDetailsFormGroup.get("income")?.value;
    this.customer.loanAmount = this.personalDetailsFormGroup.get("loanAmount")?.value;
    this.customer.cibilScore = this.randomInteger(300, 900);
    this.customer.status = 'pending';
    this.customer.documentsVerified = 'pending';
    this.incomeFiles.forEach((file:File )=>{
      this.customer.incomeProofDocs.push(file.name);
    });
    this.identityFiles.forEach((file:File) =>{
      this.customer.identityProofDocs.push(file.name);
    });
    this.addressFiles.forEach((file:File) =>{
      this.customer.addressProofDocs.push(file.name);
    });
    console.log(this.customer);

    this.customerService.updateCustomer(this.customer.id,this.customer).subscribe( 
      data =>{console.log(data);},
      error => console.log(error));

    //Add customer to salesofficer list

    this.bankAuthorityService.addCustomerToSalesOfficerList(this.customer).subscribe(data=>{
      console.log(data);
    })

    //Send application confirmation email
    this.sendEmail();
    this.router.navigate(['application-complete']);
  }

  // Helper functions
  sendEmail(){
    this.emailService.sendHtmlEmail().subscribe(data =>{console.log(data);},
    error => console.log(error));
  }
  formatBytes = (bytes:any, decimals = 2) => {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  //Delete file data in json
  deleteDocumentFromJson(fileName:string){
    this.docUrlService.getDocumentByFileName(fileName).subscribe(
      data=>this.fileToBeDeleted = data[0],
    error=> console.log(error));

    setTimeout(()=>{
      this.docUrlService.deleteDocument(this.fileToBeDeleted.id).subscribe(data=>{
        console.log(data+" deleted");
      });
    }, 3000);
    
  }

  //Add file data to json
  addDocumentToJson(data:any){
    this.docUrlService.addDocument(data).subscribe(
      data=>console.log(data),
      error=> console.log(error));
  }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
