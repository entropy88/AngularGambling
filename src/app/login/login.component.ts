import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { DataSharingService } from '../shared/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    username: '',
     password: ''   
   });
  exUser: any;
 
  

  constructor(private formBuilder: FormBuilder,private router:Router,private api:ApiService,private ngZone:NgZone,
   private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
  
    const username=this.checkoutForm.value.username;
    const password=this.checkoutForm.value.password;  

 
      this.api.GetUserByUsername(username).subscribe(res => {
        console.log(res)
        if (!res){
          alert("Грешно потребителско име или парола!");
        } else if (res.password!==password){
          alert("Грешно потребителско име или парола!");
        } else {
          this.dataSharingService.isUserLoggedIn.next(true),
        this.ngZone.run(() =>        
        localStorage.setItem("loggedUserUsername",res.username),        
        this.router.navigateByUrl('/profile'));
        }
      });

      }
  }
