import { Injectable } from '@angular/core';
import { Enviroment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = Enviroment.apiUrl;
  constructor(private http:HttpClient) {}


  addBook(data:any){
    
    return this.http.post(`${this.apiUrl}/admin/addB`, data, {withCredentials:true})
  }
  editBook(data:any){
    return this.http.post(`${this.apiUrl}/admin/UB`, data, {withCredentials:true})
  }
  getUsers(){
    return this.http.get(`${this.apiUrl}/admin/users`, {withCredentials:true})
  }

  getBookDetails(id:string|null){
    return this.http.get(`${this.apiUrl}/admin/getBD/${id}`,{withCredentials:true},)
  }

  getBookDataDetails(id:string|null){
    return this.http.get(`${this.apiUrl}/admin/getBDet/${id}`,{withCredentials:true},)
  }
  getUserData(){
    return this.http.get(`${this.apiUrl}/admin/userData`,{withCredentials:true},)
  }
  editProfile(data:any){
    return this.http.post(`${this.apiUrl}/admin/UP`,data,{withCredentials:true},)
  }
  logout(){
    return this.http.post(`${this.apiUrl}/admin/logout`,{withCredentials:true},) 
  }
}
