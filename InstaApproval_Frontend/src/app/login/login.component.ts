import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        name: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }
    dir = {"mang" : "/manager-portal", "sales":"salesofficer-portal", "super":"supervisor-portal","user":"user"};
    onSubmit(): void {
        const { name, password } = this.form;



        this.authService.login(name, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                console.log(this.roles);
                const a=this.roles[0];
                console.log(a);

                switch (a) {
                    case "ROLE_MANAGER":
                        this.router.navigate(['/manager-portal']);
                        break;
                    case "ROLE_OFFICER":
                        this.router.navigate(['/verifying-officer']);
                        break;
                    case "ROLE_USER":
                        this.router.navigate(['/user']);
                        break;
                    case "ROLE_SALESOFFICER":
                        this.router.navigate(['/salesofficer-portal']);
                        break;
                    case "ROLE_SUPERVISOR":
                        this.router.navigate(['/supervisor-portal']);
                        break;
                    default:
                        this.router.navigate(['/user']);
                        console.log("No such roles exists!");
                        break;
                }
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        window.location.reload();
    }
}
