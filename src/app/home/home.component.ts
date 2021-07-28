import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registeredUsers: Number|any;
 

  constructor(private api:ApiService,private ngZone: NgZone) { }

  ngOnInit(): void {
    //get number of registered users

    this.api.GetUsers().subscribe(res => {
      this.ngZone.run(() => this.registeredUsers = Object.entries(res).length)
    })
  
  }

}
