import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  private authListnerSubs: Subscription;
  userIsAuthenticated = false;

  ngOnInit() {
    this.authListnerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

  onLogout() {
    console.log('in logout');
    this.authService.logout();
  }
}
