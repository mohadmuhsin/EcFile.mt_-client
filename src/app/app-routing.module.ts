import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { userGuard } from './user/guard/user.guard';
import { adminGuard } from './admin/guard/admin.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login",canActivate:[userGuard,adminGuard] , component:LoginComponent},
  {path:"register", canActivate:[userGuard, adminGuard] , component:RegisterComponent},
  {path:"user",loadChildren:()=>import('./user/user.module').then(m=> m.UserModule)},
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=> m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
