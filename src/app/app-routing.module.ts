import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './shared/error/error.component';
import { AuthGuardService } from './shared/guard.service';



const routes: Routes = [
  {path : '' , redirectTo : '/home' , pathMatch : 'full', data: {animation: 'fader'}},
  {path: 'about', component:AboutComponent, data: {animation: 'fader'}},
  {path:'home', component:HomeComponent,  data: {animation: 'fader'} },
  {path: 'profile', component:ProfileComponent,
  canActivate: [AuthGuardService],
  data: {
    authenticationRequired: true,
    authenticationFailureRedirectUrl: '/login',
    animation:'fader'
  }
},
  {path:'login', component:LoginComponent,
  canActivate: [AuthGuardService],
  data: {
    authenticationRequired: false,
    authenticationFailureRedirectUrl: '/',
  }
},
  {path:'register', component:RegisterComponent,
  canActivate: [AuthGuardService],
  data: {
    authenticationRequired: false,
    authenticationFailureRedirectUrl: '/',
  }
},
  {path:'feedback', component:FeedbackComponent, data: {animation: 'fader'}},
  {path: 'game/:chNumber', component:GameComponent},
  {path:'error',component:ErrorComponent,  data: {animation: 'fader'}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
