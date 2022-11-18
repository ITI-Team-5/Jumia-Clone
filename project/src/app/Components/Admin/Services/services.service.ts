import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private myClient:HttpClient) { }



private orders = "http://localhost:8000/api/orders"
private url  = "http://localhost:8000/api/products"
private signup  = "http://localhost:8000/api/signup"
private login  = "http://localhost:8000/api/login"
private logout  = "http://localhost:8000/api/logout"
private profile  = "http://localhost:8000/api/profiles"
private discount = "http://localhost:8000/api/products/discounts"
private cat = "http://localhost:8000/api/categories"

getDiscounts(){
  return this.myClient.get(this.discount);
}

getAllCategories(){
return this.myClient.get(this.cat);
}
getCatId(id:any){
  return this.myClient.get(`${this.cat}/${id}`)
}


getAllOrders(){
  return this.myClient.get(this.orders)
}
getByOrderId(id:any){
  return this.myClient.get(`${this.orders}/${id}`)

}
UpdateOrder(updateorder:any,id:any){
  return this.myClient.post(`${this.orders}/${id}`,updateorder) // not put 
}

insertOrder(order:any){
  return this.myClient.post(this.orders,order) 
}



getAllProd(){
  return this.myClient.get(this.url)
}
getAllProducts(page:number){
  return this.myClient.get(this.url +'?page=' +page)
}
getById(slug:any){
  return this.myClient.get(`${this.url}/${slug}`)

}
getByIdedit(slug:any){
  return this.myClient.get(`${this.url}/${slug}/edit`)

}
AddProd(newProduct:any){
  return this.myClient.post(this.url,newProduct)
}
UpdateProd(updatePro:any,id:any){
  return this.myClient.post(`${this.url}/${id}`,updatePro) // not put 
}
Deleteprod(id:number){
  return this.myClient.delete(`${this.url}/${id}`)
}


addUser(newUser:any){
  return this.myClient.post(this.signup,newUser)
}
userLogin(newUser:any){
  return this.myClient.post(this.login,newUser)
}

getAllUsers(){
  return this.myClient.get(this.signup)
}
getUserById(Id :any){
  return this.myClient.get(`${this.signup}/${Id}`)
}


getProfile(){
  return this.myClient.get(this.profile)
}
getByProfileId(id:any){
  return this.myClient.get(`${this.profile}/${id}`)

}
getProfileEdit(id:any){
  return this.myClient.get(`${this.profile}/${id}/edit`)

}
UpdateProfile(updatePro:any,id:any){
  return this.myClient.post(`${this.profile}/${id}`,updatePro) // not put 
}
DeleteOrd(id:number){
  return this.myClient.delete(`${this.profile}/${id}`)
}

cartSubject = new Subject<any>();


isAdmin(){
  return localStorage.getItem('role')=="admin";
}
isUser(){
  return localStorage.getItem('role')=="user";
}
}






