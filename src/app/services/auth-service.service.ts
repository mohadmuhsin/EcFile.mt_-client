import { Injectable } from '@angular/core';
import { Enviroment } from '../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = Enviroment.apiUrl;

  constructor(private http:HttpClient,
    private cookieService: CookieService,
    ) { }

  login(data:any){
 
    return this.http.post(`${this.apiUrl}/login`,data,{ withCredentials:true });
  }
  register(data:any){
    
    return this.http.post(`${this.apiUrl}/register`,data,{ withCredentials:true})
  }

  refreshToken(){
    const cookieValue = this.cookieService.get('refreshToken');
    return this.http.get(`${this.apiUrl}/refresh/token/${cookieValue}`,{withCredentials:true})
  }

  verify(mobile:string|null){     
    return this.http.post(`${this.apiUrl}/verify`,{mobile},{withCredentials:true})
  }
}
