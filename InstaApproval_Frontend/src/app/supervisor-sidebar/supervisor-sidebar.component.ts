import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor-sidebar.component.html',
  styleUrls: ['./supervisor-sidebar.component.css']
})
export class SupervisorSidebarComponent implements OnInit {



  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  constructor(private observer: BreakpointObserver,private router:Router,private tokenStorageService: TokenStorageService) { }

  canDeactivate():boolean | Observable<boolean> | Promise<boolean>{
    const result = window.confirm('Are you sure you want to leave this page?');
    if(result){
      localStorage.removeItem("supervisor");
      return true;
    }
    return false;
  };

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
