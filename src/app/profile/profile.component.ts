import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { LocalStorage } from '../injector-tokens';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 username: string | null;
  user: User |any;
  

  constructor(private api:ApiService,private ngZone: NgZone,  @Inject(LocalStorage) private localStorage: Window['localStorage']) { 
  this.username=this.localStorage.getItem("loggedUserUsername")
  }

  ngOnInit(): void {
    if (this.username){
    this.api.GetUserByUsername(this.username).subscribe(res => {
      this.ngZone.run(() => this.user = res)
    })
  }
}

}
