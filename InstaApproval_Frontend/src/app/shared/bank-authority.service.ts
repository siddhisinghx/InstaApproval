import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BankAuthorityService {

  constructor(private http: HttpClient) { }
  postUser(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/customers", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getUser(){
    return this.http.get<any>("http://localhost:8080/api/v1/salesOfficers")
      .pipe(map((res:any)=>{
        // for (let i of res){
        //   console.log(i.status)
        // }
        return res;
      }))
  }
    getAllUsers(){
        return this.http.get<any>("http://localhost:8080/api/v1/customers")
            .pipe(map((res:any)=>{
                return res;
            }))
    }
  getCustomersUnderSalesOfficer(){
    return this.http.get<any>("http://localhost:8080/api/v1/salesOfficers")
      .pipe(map((res:any)=>{
        // for (let i of res){
        //   console.log(i.status)
        // }
        return res[0].customersUnderSalesOfficer;
      }))
  }
  getUserById(id: number){
    return this.http.get<any>("http://localhost:3000/users/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  updateUser(action: string, id: number){
    return this.http.put<any>("http://localhost:8080/api/v1/managers/1/updateCustomerStatus/"+action, id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  deleteUser(id: number){
    return this.http.delete<any>("http://localhost:3000/users/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateCustomerStatusBySalesOfficer(action: string, id: number){
    return this.http.put<any>("http://localhost:8080/api/v1/salesOfficers/1/updateCustomerStatus/"+action, id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  addCustomerToSalesOfficerList(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/salesOfficers/1/addCustomerToSalesOfficerList", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }


  // SUPERVISOR

  postRequestToSupervisor(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/supervisors/1/addCustomerToSupervisorList", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  removeCustomerFromSupervisorList(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/supervisors/1/removeCustomerFromSupervisorList", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getCustomersUnderSupervisor(){
    return this.http.get<any>("http://localhost:8080/api/v1/supervisors")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getManagerStatus() {
    return this.http.get<any>("http://localhost:8080/api/v1/managers")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateRequestToSupervisor(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/supervisorApplicationRequests/"+id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  updateCustomerStatusBySupervisor(action: string, id: number){
    return this.http.put<any>("http://localhost:8080/api/v1/supervisors/1/updateCustomerStatus/"+action, id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }


  // MANAGER

  postRequestToManager(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/managers/1/addCustomerToManagerList", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getRequestToManager() {
    return this.http.get<any>("http://localhost:8080/api/v1/managers")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getCustomersUnderManager() {
    return this.http.get<any>("http://localhost:8080/api/v1/managers")
      .pipe(map((res:any)=>{
        return res[0].customersUnderManager;
      }))
  }

  updateRequestToManager(action: string, id: number) {
    return this.http.put<any>("http://localhost:8080/api/v1/managers/1/updateCustomerStatus/"+action, id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  updateCustomerStatusByManager(action: string, id: number){
    return this.http.put<any>("http://localhost:8080/api/v1/managers/1/updateCustomerStatus/"+action, id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  removeCustomerFromManagerList(data: any){
    return this.http.post<any>("http://localhost:8080/api/v1/supervisors/1/removeCustomerFromManagerList", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
