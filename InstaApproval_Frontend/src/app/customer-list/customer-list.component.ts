import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../customer'
import { CustomerService } from '../shared/customer.service';
import { DocURLService } from '../shared/doc-url.service';
import { TokenStorageService } from '../_services/token-storage.service';

declare var $: any;

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    customers!: Customer[];
    displayFileData = {
        "id" : 0,
        "fileName": "",
        "url": ""
    };

    constructor(private customerService: CustomerService, private docUrlService: DocURLService,
                private router: Router, private activatedRoute: ActivatedRoute,public sanitizer: DomSanitizer,private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.getCustomers();
    }

    ngOnChanges(): void{
        this.getCustomers();
    }

    private getCustomers(){
        this.customerService.getCustomersList()
            .subscribe(data=>{
                this.customers = data.filter((customer)=>{return customer.applicationNumber!=0});
                console.log(this.customers);
                let i;
                for(i=0;i<this.customers.length;i++){
                    this.customers[i].incomeProofDocs = [... new Set(this.customers[i].incomeProofDocs)];
                    this.customers[i].identityProofDocs = [... new Set(this.customers[i].identityProofDocs)];
                    this.customers[i].addressProofDocs = [... new Set(this.customers[i].addressProofDocs)];
                }
            });
    }

    // customerDetails(id: number){
    //   this.router.navigate(['customer-details', id]);
    // }

    // updateCustomer(id: number){
    //   this.router.navigate(['update-customer', id]);
    // }

    // deleteCustomer(id: number){
    //   this.customerService.deleteCustomer(id).subscribe( data => {
    //     console.log(data);
    //     this.getCustomers();
    //   })
    // }
    customerToBeUpdated!: Customer;

    approveDocuments(id:number){
        if(window.confirm("Do you really want to approve?")){
            this.customerService.getCustomerById(id).subscribe(
                data=>{this.customerToBeUpdated = data; this.customerToBeUpdated.documentsVerified = "Approved"},
                error=>console.log(error)
            );

            setTimeout(()=>
                this.customerService.updateCustomer(id,this.customerToBeUpdated).subscribe(
                    data=>console.log(data),
                    error=>console.log(error)
                ),1000);
        }
        setTimeout(()=>location.reload(), 1000);
    }

    rejectDocuments(id: number){
        if(window.confirm("Do you really want to reject?")){
            this.customerService.getCustomerById(id).subscribe(
                data=>{this.customerToBeUpdated = data; this.customerToBeUpdated.documentsVerified = "Rejected"},
                error=>console.log(error)
            );

            setTimeout( () =>
                this.customerService.updateCustomer(id,this.customerToBeUpdated).subscribe(
                    data=>console.log(data),
                    error=>console.log(error)
                ), 1000);
        }
        setTimeout(()=>location.reload(), 1000);
    }

    displayDocument(fileName:string){
        $("#docDisplayModal" as any).modal('show');

        this.docUrlService.getDocumentByFileName(fileName).subscribe(data=>{
            this.displayFileData = data[0];
        });
    }

    closeDocumentModal(){
        $("#docDisplayModal" as any).modal('toggle');
    }

    logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    }

}

