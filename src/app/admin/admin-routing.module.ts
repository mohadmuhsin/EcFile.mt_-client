import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guard/admin.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', canActivate:[adminGuard], component: HomeComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
