import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string | null;
  user: User |any;
  

  constructor(private api:ApiService,private ngZone: NgZone) { 
  this.email=localStorage.getItem("loggedUser")
  }

  ngOnInit(): void {
    if (this.email){
    this.api.GetUserByEmail(this.email).subscribe(res => {
      this.ngZone.run(() => this.user = res)
    })
  }
}

}
