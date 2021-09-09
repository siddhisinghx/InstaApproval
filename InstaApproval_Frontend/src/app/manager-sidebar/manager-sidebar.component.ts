import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-manager-portal',
  templateUrl: './manager-sidebar.component.html',
  styleUrls: ['./manager-sidebar.component.css']
})
export class ManagerSidebarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  constructor(private observer: BreakpointObserver,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.sidenav.opened);
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
