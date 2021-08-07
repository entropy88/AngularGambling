
  import { NgModule } from '@angular/core';
  import { RouterModule, Routes, CanActivate } from '@angular/router';
  import { NotFoundComponent } from './not-found/not-found.component';

  import { AuthGuardService } from '../shared/guard.service';
  
  
  
  const routes: Routes = [
  {path:'404',component:NotFoundComponent},  
    {path: '**', redirectTo: '/404'}
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
