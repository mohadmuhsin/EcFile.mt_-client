import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { saveAs } from 'file-saver';  
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users!:any
  searchQuery!:string
  noResultsFound:boolean = false
  constructor(
    private router :Router,
    private service:AdminService,
    private ngxCookieService: CookieService

    ){}
  ngOnInit(): void {
    this.getUsers()
  }
  search(){
    if (this.searchQuery.trim() !== '') {
      this.users = this.users.filter((user: any) =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())  
     )
     this.noResultsFound = this.users.length === 0
   } else {
     this.getUsers()
     this.noResultsFound = false
   }
  }

  triggerDownload(url: string, fileName: string): void {
    saveAs(url, fileName);
  }


  getUsers() {
    this.service.getUsers().subscribe({
      next:(res:any)=>{
        this.users = res.users
      },error:(err)=>{
        console.log(err); 
      }
    })
  }


  logout(){
    this.service.logout().subscribe({
      next:(res:any)=>{
          localStorage.removeItem("adJwt")
          this.ngxCookieService.delete('adJwt')
          this.ngxCookieService.delete('adRtkn')
          this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
      }
    })  
  }
}
