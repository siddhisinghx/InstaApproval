import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showMangBoard = false;
    showModeratorBoard = false;
    showOfficerBoard = false;
    name?: string;

    constructor(private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_SUPERVISOR');
            this.showModeratorBoard = this.roles.includes('ROLE_SALESOFFICER');
            this.showMangBoard = this.roles.includes('ROLE_MANAGER');
            this.showOfficerBoard = this.roles.includes('ROLE_OFFICER');

            this.name = user.name;
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
