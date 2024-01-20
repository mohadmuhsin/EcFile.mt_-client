import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent  implements OnInit{
  token!:string| null;
  constructor(
    private router :Router,
    private activeRoute: ActivatedRoute,
    private service :AuthServiceService,
    private ngxCookieService: CookieService
  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.token = params.get('token');      
    })
  }
  verfiy(){
    this.service.verify(this.token).subscribe({
      next:((res:any)=>{
        if(res.user.role === "user"){
          localStorage.setItem('jwt', res.token.accessToken)
          this.ngxCookieService.set('jwt', res.token.accessToken, 1)
          this.ngxCookieService.set('rtkn', res.token.refreshToken, 7)
          this.router.navigate(['/user'])
        } 
      }),
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
