import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocURLService {
  private url = "http://localhost:3000/docURL";

  constructor(private http:HttpClient) { }

  getAllDocuments():Observable<any>{
    return this.http.get(this.url);
  }

  getDocumentByFileName(fileName:string):Observable<any>{
    return this.http.get(`${this.url}?fileName=${fileName}`);
  }

  addDocument(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }

  updateDocument(fileName:string,data:any):Observable<any>{
    return this.http.put(`${this.url}?fileName=${fileName}`,data);
  }

  deleteDocument(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }


}
