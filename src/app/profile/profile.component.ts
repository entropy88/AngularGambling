import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 username: string | null;
  user: User |any;
  

  constructor(private api:ApiService,private ngZone: NgZone) { 
  this.username=localStorage.getItem("loggedUserUsername")
  }

  ngOnInit(): void {
    if (this.username){
    this.api.GetUserByUsername(this.username).subscribe(res => {
      this.ngZone.run(() => this.user = res)
    })
  }
}

}
