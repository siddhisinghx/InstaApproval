import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8082/api/test/';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getPublicContent(): Observable<any> {
        return this.http.get(API_URL + 'all', { responseType: 'text' });
    }

    getUserBoard(): Observable<any> {
        return this.http.get(API_URL + 'user', { responseType: 'text' });
    }

    getModeratorBoard(): Observable<any> {
        return this.http.get(API_URL + 'sales', { responseType: 'text' });
    }

    getAdminBoard(): Observable<any> {
        return this.http.get(API_URL + 'super', { responseType: 'text' });
    }
    getMangBoard(): Observable<any> {
        return this.http.get(API_URL + 'mang', { responseType: 'text' });
    }

    getOfficerBoard(): Observable<any> {
        return this.http.get(API_URL + 'officer', { responseType: 'text' });
    }
}
