import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { DataSharingService } from '../shared/data-sharing.service';
import { User } from '../shared/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: '',
    password: '',
    rePassword: ''
  });



  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private ngZone: NgZone,
    private dataSharingService: DataSharingService) {

  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    if (this.checkoutForm.invalid) { return; }
    const username = this.checkoutForm.value.username;
    const email = this.checkoutForm.value.email;
    const password = this.checkoutForm.value.password;
    const rePassword = this.checkoutForm.value.rePassword;

    const emailPattern = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    console.log(emailPattern.test(email))
    if (!emailPattern.test(email)) {
      alert("Невалиден имейл!")
    } else if (password !== rePassword) {
      alert("Паролите не съвпадат!")
    } else {
      console.log(email, password, rePassword);
      this.api.GetUserByUsername(username).subscribe(res => {
        if (res) {
          alert("Вече съществува такъв потребител!");
        } else {
          this.api.AddUser({ username, email, password, chapterSave: "0" }).subscribe(res => {

            localStorage.setItem("loggedUserUsername", res.username),
              this.dataSharingService.isUserLoggedIn.next(true),
              this.ngZone.run(() => this.router.navigateByUrl('/profile'))
          });
        }
      });
    }
  }

}