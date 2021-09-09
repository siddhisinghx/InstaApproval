import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { CustomerLoanApplicationComponent } from './customer-loan-application/customer-loan-application.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import {ManagerSidebarComponent} from "./manager-sidebar/manager-sidebar.component";
import {ManagerMainComponent} from "./manager-portal/manager-main/manager-main.component";
import {ManagerApprovedComponent} from "./manager-portal/manager-approved/manager-approved.component";
import {ManagerRejectedComponent} from "./manager-portal/manager-rejected/manager-rejected.component";
import {ManagerPendingComponent} from "./manager-portal/manager-pending/manager-pending.component";
import {SalesofficerSidebarComponent} from "./salesofficer-sidebar/salesofficer-sidebar.component";
import {SalesofficerMainComponent} from "./salesofficer-portal/salesofficer-main/salesofficer-main.component";
import {SalesofficerSupervisorstatusComponent} from "./salesofficer-portal/salesofficer-supervisorstatus/salesofficer-supervisorstatus.component";
import {SalesofficerApprovedComponent} from "./salesofficer-portal/salesofficer-approved/salesofficer-approved.component";
import {SalesofficerPendingComponent} from "./salesofficer-portal/salesofficer-pending/salesofficer-pending.component";
import {SalesofficerRejectedComponent} from "./salesofficer-portal/salesofficer-rejected/salesofficer-rejected.component";
import {SupervisorSidebarComponent} from "./supervisor-sidebar/supervisor-sidebar.component";
import {SupervisorMainComponent} from "./supervisor-portal/supervisor-main/supervisor-main.component";
import {SupervisorManagerstatusComponent} from "./supervisor-portal/supervisor-managerstatus/supervisor-managerstatus.component";
import {SupervisorRejectedComponent} from "./supervisor-portal/supervisor-rejected/supervisor-rejected.component";
import {SupervisorPendingComponent} from "./supervisor-portal/supervisor-pending/supervisor-pending.component";
import {SupervisorApprovedComponent} from "./supervisor-portal/supervisor-approved/supervisor-approved.component";
import { ApplicationCompleteComponent } from './application-complete/application-complete.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { UserHomeComponent } from './user-home/user-home.component';
import {EmiCalculatorComponent} from "./emi-calculator/emi-calculator.component";
import {FinancialsComponent} from "./manager-portal/financials/financials.component";
import { RepayLoanComponent } from './repay-loan/repay-loan.component';

const routes: Routes = [
    {path: 'verifying-officer', component: CustomerListComponent},
    {path: 'create-customer', component: CreateCustomerComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'update-customer/:id', component: UpdateCustomerComponent},
    {path: 'customer-details/:id', component: CustomerDetailsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'emi-calculator', component: EmiCalculatorComponent},
    { path: 'manager-portal', component: ManagerSidebarComponent, children: [
            { path: '', redirectTo: '/manager-portal/manager-main', pathMatch: 'full' },
            { path: 'manager-main', component: ManagerMainComponent },

            { path: 'financials', component: FinancialsComponent },
            { path: 'manager-approved', component: ManagerApprovedComponent },
            { path: 'manager-pending', component: ManagerPendingComponent },
            { path: 'manager-rejected', component: ManagerRejectedComponent }
        ] },
    {path:'salesofficer-portal',component: SalesofficerSidebarComponent,
        children:[
            { path: '', redirectTo: '/salesofficer-portal/sales-main', pathMatch: 'full' },
            { path: 'sales-main', component: SalesofficerMainComponent },
            { path: 'sales-supervisorstatus', component: SalesofficerSupervisorstatusComponent },
            { path: 'sales-approved', component: SalesofficerApprovedComponent },
            { path: 'sales-pending', component: SalesofficerPendingComponent },
            { path: 'sales-rejected', component: SalesofficerRejectedComponent }
        ]},
    {
        path: 'supervisor-portal', component: SupervisorSidebarComponent,
        children: [
            { path: '', redirectTo: '/supervisor-portal/supervisor-main', pathMatch: 'full' },
            { path: 'supervisor-main', component: SupervisorMainComponent },
            { path: 'supervisor-managerstatus', component: SupervisorManagerstatusComponent },
            { path: 'supervisor-approved', component: SupervisorApprovedComponent },
            { path: 'supervisor-pending', component: SupervisorPendingComponent },
            { path: 'supervisor-rejected', component: SupervisorRejectedComponent }
        ]
    },
    {path: 'customer-loan-application', component:CustomerLoanApplicationComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'application-complete',component: ApplicationCompleteComponent},
    { path: 'user', component: UserHomeComponent },
    {path: 'view-application',component: ViewApplicationComponent},
    {path: 'repay-loan',component: RepayLoanComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
