import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../injector-tokens';
import { DataSharingService } from '../shared/data-sharing.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  isUserLoggedIn: boolean | undefined;
  loggedUserUsername: string | null | undefined;

  constructor(private router: Router, private dataSharingService: DataSharingService,
    @Inject(LocalStorage) private localStorage: Window['localStorage']) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;

    });

  }

  ngOnInit(): void {

  }

  onLogout(): void {
    this.localStorage.clear();
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigateByUrl('/home');
  }

}
