import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SalesofficerSidebarComponent } from './salesofficer-sidebar/salesofficer-sidebar.component';
import { SupervisorSidebarComponent } from './supervisor-sidebar/supervisor-sidebar.component';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from '@angular/material/expansion';
import {AgGridModule} from "ag-grid-angular";
import { ManagerApprovedComponent } from './manager-portal/manager-approved/manager-approved.component';
import { ManagerRejectedComponent } from './manager-portal/manager-rejected/manager-rejected.component';
import { ManagerMainComponent } from './manager-portal/manager-main/manager-main.component';
import { ManagerPendingComponent } from './manager-portal/manager-pending/manager-pending.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import "ag-grid-enterprise";
import { SalesofficerMainComponent } from './salesofficer-portal/salesofficer-main/salesofficer-main.component';
import { SalesofficerApprovedComponent } from './salesofficer-portal/salesofficer-approved/salesofficer-approved.component';
import { SalesofficerRejectedComponent } from './salesofficer-portal/salesofficer-rejected/salesofficer-rejected.component';
import { SalesofficerPendingComponent } from './salesofficer-portal/salesofficer-pending/salesofficer-pending.component';
import { SalesofficerSupervisorstatusComponent } from './salesofficer-portal/salesofficer-supervisorstatus/salesofficer-supervisorstatus.component';
import { SupervisorManagerstatusComponent } from './supervisor-portal/supervisor-managerstatus/supervisor-managerstatus.component';
import { SupervisorMainComponent } from './supervisor-portal/supervisor-main/supervisor-main.component';
import { SupervisorRejectedComponent } from './supervisor-portal/supervisor-rejected/supervisor-rejected.component';
import { SupervisorPendingComponent } from './supervisor-portal/supervisor-pending/supervisor-pending.component';
import { SupervisorApprovedComponent } from './supervisor-portal/supervisor-approved/supervisor-approved.component';
import { CustomerLoanApplicationComponent } from './customer-loan-application/customer-loan-application.component';
import { HomeComponent } from './home/home.component';
import { ApplicationCompleteComponent } from './application-complete/application-complete.component';

import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import {ChartsModule} from "ng2-charts";
import {MatSliderModule} from "@angular/material/slider";
import { FinancialsComponent } from './manager-portal/financials/financials.component';
import { RepayLoanComponent } from './repay-loan/repay-loan.component';


@NgModule({
    declarations: [
        AppComponent,
        CustomerListComponent,
        CreateCustomerComponent,
        UpdateCustomerComponent,
        CustomerDetailsComponent,
        LoginComponent,
        RegisterComponent,
        SalesofficerSidebarComponent,
        SupervisorSidebarComponent,
        ManagerSidebarComponent,
        ManagerApprovedComponent,
        ManagerRejectedComponent,
        ManagerMainComponent,
        ManagerPendingComponent,
        BtnCellRendererComponent,
        SalesofficerMainComponent,
        SalesofficerApprovedComponent,
        SalesofficerRejectedComponent,
        SalesofficerPendingComponent,
        SalesofficerSupervisorstatusComponent,
        SupervisorManagerstatusComponent,
        SupervisorMainComponent,
        SupervisorRejectedComponent,
        SupervisorPendingComponent,
        SupervisorApprovedComponent,
        CustomerLoanApplicationComponent,
        HomeComponent,
        ApplicationCompleteComponent,
        ViewApplicationComponent,
        UserHomeComponent,
        EmiCalculatorComponent,
        RepayLoanComponent,
        EmiCalculatorComponent,
        FinancialsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        BrowserModule,
        FormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        BrowserAnimationsModule,

        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule,
        AngularTypewriterEffectModule,
        ChartsModule,
        MatSliderModule,
        FormsModule,
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
