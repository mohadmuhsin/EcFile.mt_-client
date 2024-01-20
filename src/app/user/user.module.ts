import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { VerifyComponent } from './components/verify/verify.component';




@NgModule({
  declarations: [
    HomeComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UserModule { }
