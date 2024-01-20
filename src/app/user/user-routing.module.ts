import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { userGuard } from './guard/user.guard';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  { path: '', canActivate:[userGuard], component: HomeComponent},
  { path: 'verify/:token',component:VerifyComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class UserRoutingModule { }
