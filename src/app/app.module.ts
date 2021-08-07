import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { AuthGuardService } from './shared/guard.service';
import { DataSharingService } from './shared/data-sharing.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    GameComponent,
    NotFoundComponent,
    EditFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthGuardService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
