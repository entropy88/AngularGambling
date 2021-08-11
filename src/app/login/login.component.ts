import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '../injector-tokens';
import { ApiService } from '../shared/api.service';
import { DataSharingService } from '../shared/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  exUser: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService, private ngZone: NgZone,
    private dataSharingService: DataSharingService,
    @Inject(LocalStorage) private localStorage: Window['localStorage']) { }

  ngOnInit(): void {

  }




  onSubmit(): void {

    const username = this.checkoutForm.value.username;
    const password = this.checkoutForm.value.password;
    if (this.checkoutForm.invalid) { return; }

    this.api.GetUserByUsername(username).subscribe(res => {
      if (!res) {
        alert("Грешно потребителско име или парола!");
      } else if (res.password !== password) {
        alert("Грешно потребителско име или парола!");
      } else {
        this.dataSharingService.isUserLoggedIn.next(true),
          this.ngZone.run(() =>
            this.localStorage.setItem("loggedUserUsername", res.username),
          
            this.router.navigateByUrl('/profile'));
      }
    });

  }
}
