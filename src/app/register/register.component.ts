import { guardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { DataSharingService } from '../shared/data-sharing.service';
import { User } from '../shared/classes/user';
import { LocalStorage } from '../injector-tokens';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rePassword: ['', [Validators.required, Validators.minLength(4)]],
    profilePicture:['',[urlValidator]]
  });
  

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private ngZone: NgZone,
    private dataSharingService: DataSharingService,
    @Inject(LocalStorage) private localStorage: Window['localStorage']) {

  }

  ngOnInit(): void {
    
    
  }



  onSubmit(): void {

    const username = this.checkoutForm.value.username.toLocaleLowerCase();
    const email = this.checkoutForm.value.email;
    const password = this.checkoutForm.value.password;
    const rePassword = this.checkoutForm.value.rePassword;
    const profilePicture=this.checkoutForm.value.profilePicture;

    if (password !== rePassword) {
      alert("Паролите не съвпадат!");
      return;
    }

    if (this.checkoutForm.invalid) { return; }


    this.api.GetUserByUsername(username).subscribe(res => {
      if (res) {
        alert("Вече съществува такъв потребител!");
      } else {
           
        const today = new Date();
const registrationDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        this.api.AddUser({ username, email, password, chapterSave: "0",registrationDate,profilePicture }).subscribe(res => {

          this.localStorage.setItem("loggedUserUsername", res.username),
            this.dataSharingService.isUserLoggedIn.next(true),
            this.ngZone.run(() => this.router.navigateByUrl('/profile'))
        });
      }
    });
  }

}
//email validator
function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) { return null; }
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) ? null : {
    invalidEmail: true
  };
}

function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) { return null; }
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(control.value) ? null : {
    invalidUrl: true
  };
}



