import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { data } from 'jquery';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
isLoggedIn: any;
LoggedInAdmin:any;
flag = false;
name:any;
cartItem: any = 0;

  constructor(private _route:Router, public myService: ServicesService ) { 
      this.myService.cartSubject.subscribe((data)=>{
        this.cartItem = data;
      })
     
    }

  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("userType")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
    if(this.LoggedInAdmin == 'admin'){
      this.flag = true; //admin 
    }
    if(!this.LoggedInAdmin){
        window.location.href = '/';
    }
   
   
   
    this.CartItemFun();
  }

  logout(){
  
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("adminId");
    localStorage.removeItem("userType");
    localStorage.removeItem("name");
    window.location.href= "/login"
  } 

  CartItemFun(){
    var CartCount = JSON.parse(localStorage.getItem('cart')) //------->>>>>> 3dd kol al products .length 
    var itemCount = CartCount['0'].quanity; 
    console.log(itemCount);// ------->>>>>>> kam montg mn nafs alproduct 
    if(localStorage.getItem('cart')){
      // for()
        
      // this.cartItem = CartCount.length;
    }
  }
}

 

