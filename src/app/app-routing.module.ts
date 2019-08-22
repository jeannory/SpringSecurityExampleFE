import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { SpaceComponent } from './space/space.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home', 
    component:HomeComponent
  },
  {
    path:'user', 
    component:SpaceComponent,
    canActivate: [AuthGuardService],
    data:{
      expectedRole:'USER'
    }   
  },
  {
    path:'manager', 
    component:ManagerComponent,
    canActivate: [AuthGuardService],
    data:{
      expectedRole:'MANAGER'
    }   
  },
  {
    path:'admin', 
    component:AdminComponent,
    canActivate: [AuthGuardService],
    data:{
      expectedRole:'ADMIN'
    }
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
