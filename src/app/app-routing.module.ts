import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutComponent } from './about/about.component';
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
  canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'feedback', component:FeedbackComponent},
  {path: 'game/:chNumber',component:GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
