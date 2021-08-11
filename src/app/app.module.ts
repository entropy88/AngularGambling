import { NgModule,PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './shared/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { CommonModule } from './common/common.module';
import { appInterceptorProvider } from './shared/http-interceptor-service.service';
import { ErrorComponent } from './shared/error/error.component';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LocalStorage } from './injector-tokens';



@NgModule({
  declarations: [
    AppComponent,
    
     NavComponent,
    AboutComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    GameComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthGuardService, DataSharingService,appInterceptorProvider,
    //local storage
    {
      provide: LocalStorage,
      useFactory: (platformId: Object) => {

        if (isPlatformBrowser(platformId)) {
          return window.localStorage;
        }
        if (isPlatformServer(platformId)) {
          return class implements Storage {
            length = 0;
            private data: Record<string, string> = {};

            clear(): void {
              this.data = {};
            }

            getItem(key: string): string | null {
              return this.data[key];
            }

            key(index: number): string | null {
              throw new Error('Method not implemented.');
            }

            removeItem(key: string): void {
              const { [key]: removedItem, ...others } = this.data;
              this.data = others;
            }

            setItem(key: string, value: string): void {
              this.data[key] = value;
            }
          }
        }
        throw Error('NOT IMPLEMENTED');
      },
      deps:[PLATFORM_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
