import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData!:FormGroup;
  role:string = ""
  alertMessage!:string;
  alertTYpe!:string;  
  alert:boolean = false;
  condition: boolean = true
  passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  constructor(
    private router :Router,
    private formBuilder:FormBuilder,
    private service : AuthServiceService,
    private ngxCookieService: CookieService

    ){}

ngOnInit(): void {
  this.formData = this.formBuilder.group({
    mobile:["",[Validators.required, Validators.minLength(10)]],
    password:["",[Validators.required,Validators.minLength(8), Validators.pattern(this.passwordPattern)]]
  })
}

selectRole(role: string): void {
  this.role = role;
}


login(){
  
  let authData = this.formData.getRawValue()
  let number = authData.mobile + ""
  if (this.role === "") {
    this.alert = true;
    this.condition = false;
    this.alertTYpe = "Warning alert!";
    this.alertMessage = "Please choose your role";

  }else if (!["6", "7", "8", "9"].includes(number.charAt(0))) {

      this.alert = true
      this.condition = false
      this.alertTYpe = "Warning alert!"
      this.alertMessage = "mobile number should start with 6,7,8,9";

  }else if(this.formData.valid){

    authData = { role: this.role, ...authData }
    this.service.login(authData).subscribe({
      next:(res:any)=>{
        
        if(res.user.role === "admin"){
          localStorage.setItem('adJwt', res.token.accessToken)
          this.ngxCookieService.set('adJwt', res.token.accessToken, 1)
          this.ngxCookieService.set('adRtkn', res.token.refreshToken, 7)
          this.router.navigate(['/admin'])
        }
        if(res.user.role === "user"){
          
          this.alert = true
          this.condition = true
          this.alertTYpe = "Success alert!"
          this.alertMessage = res.message;
        }
      },
      error:(error:any)=>{
        console.log(error);
        this.alert = true
        this.condition = false
        this.alertTYpe = "Warning alert!"
        this.alertMessage = error.error.message;
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    })

  }else{
    this.alert = true
    this.condition = false
    this.alertTYpe = "Warning alert!"
    this.alertMessage = "Feilds can't be empty";
    // setTimeout(() => {
    //   this.alert = false;
    // }, 5000);
  }
}
}
