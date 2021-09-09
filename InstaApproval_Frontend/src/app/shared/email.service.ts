import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = "http://localhost:8081/email";

  constructor(private http:HttpClient) { }

  sendTextEmail():Observable<any>{
    return this.http.get(`${this.url}/send_text_email`,{responseType: 'text'});
  }

  sendHtmlEmail():Observable<any>{
    return this.http.get(`${this.url}/send_html_email`,{responseType: 'text'});
  }
  sendHtmlApprovedEmail():Observable<any>{
    return this.http.get(`${this.url}/send_html_approved_email`,{responseType: 'text'});
  }

  sendEmailAttachment():Observable<any>{
    return this.http.get(`${this.url}/send_email_attachment`,{responseType: 'text'});
  }
}
