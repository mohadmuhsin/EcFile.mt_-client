import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

constructor(
  private service:UserService,
  private router :Router,
  private ngxCookieService: CookieService

){}
  
  

  logout(){
    this.service.logout().subscribe({
      next:(res:any)=>{
          localStorage.removeItem("jwt")
          this.ngxCookieService.delete('jwt')
          this.ngxCookieService.delete('Rtkn')
          this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  } 
}
