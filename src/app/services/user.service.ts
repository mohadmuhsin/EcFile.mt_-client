import { Injectable } from '@angular/core';
import { Enviroment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = Enviroment.apiUrl;
  constructor(private http:HttpClient) {}

  getBooks(){
    return this.http.get(`${this.apiUrl}/user/getB`, {withCredentials:true})
  }

  borrowBook(book_id:string){
    return this.http.patch(`${this.apiUrl}/user/BB/${book_id}`,{withCredentials:true})
  }
  returnBook(book_id:string){
    return this.http.patch(`${this.apiUrl}/user/RB/${book_id}`,{withCredentials:true})
  }

  getBorrwoedBooks(){
    return this.http.get(`${this.apiUrl}/user/getBdB`, {withCredentials:true})
  }

  getUserData(){
    return this.http.get(`${this.apiUrl}/user/getP`,{withCredentials:true})
  }
  editProfile(data:any){
    return this.http.post(`${this.apiUrl}/user/UP`,data,{withCredentials:true},)
  }

  logout(){
    return this.http.post(`${this.apiUrl}/user/logout`,{withCredentials:true},) 
  }
}
