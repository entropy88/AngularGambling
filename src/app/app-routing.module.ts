import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/guard.service';



const routes: Routes = [
  {path : '' , redirectTo : '/home' , pathMatch : 'full'},
  {path: 'about', component:AboutComponent},
  {path:'home', component:HomeComponent},
  {path: 'profile', component:ProfileComponent,
  canActivate: [AuthGuardService],
  data: {
    authenticationRequired: true,
    authenticationFailureRedirectUrl: '/login',
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
  {path:'feedback', component:FeedbackComponent},
  {path:'update-feedback/:id', component:EditFeedbackComponent},
  {path: 'game/:chNumber', component:GameComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
