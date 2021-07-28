import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    email: '',
     password: ''   
   });
  exUser: any;
  

  constructor(private formBuilder: FormBuilder,private router:Router,private api:ApiService,private ngZone:NgZone) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
  
    const email=this.checkoutForm.value.email;
    const password=this.checkoutForm.value.password;
  

  const emailPattern=new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
 
    if (!emailPattern.test(email)){
      alert("Невалиден имейл!")
    } 
        
     else {
      this.api.GetUserByEmail(email).subscribe(res => {
        if (!res){
          alert("Грешно потребителско име или парола!");
        } else if (res.password!==password){
          alert("Грешно потребителско име или парола!");
        } else {
        this.ngZone.run(() =>
        
        localStorage.setItem("loggedUser",res.email),
        this.router.navigateByUrl('/home'));
        }
      });
     }

        // localStorage.setItem('loggedUserEmail', email)
        // this.router.navigate(['']);
      }
  }
