import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
loggedUser: string|null
  constructor(private router:Router) {
    this.loggedUser=localStorage.getItem("loggedUserUsername")
  }

  ngOnInit(): void {
  }

  onLogout():void{
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

}
