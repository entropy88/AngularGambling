import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonRoutingModule } from './common-routing.module';



@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
   BrowserModule,
   CommonRoutingModule
  ],
  exports:[
    FooterComponent,
    NotFoundComponent
  ]
})
export class CommonModule { }
