import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
cartItem: any ;
title:any;
Result:any;
products:any[]=[];
page:number = 1;
total:number = 0;
constructor( public myservice: ServicesService ,private route: ActivatedRoute ) { 
    this.myservice.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })
    }

  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("role")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
     this.myservice.getAllProducts(this.page).subscribe((response:any)=>{
      this.products = response.data;
      this.total = response.total;
    })
  }

  logout(){
  
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("UserId");
    window.location.href= "/login"
  } 
 

  CartItemFun(){
    var CartCount = JSON.parse(localStorage.getItem('cart')) 
    var totalCount = 0;
    if(localStorage.getItem('cart')){
      for(let i =0; i < CartCount.length ; i++){
         totalCount += CartCount[i].quanity
      }
      
        console.log(totalCount);
        this.cartItem = totalCount;
    }
    this.myservice.cartSubject.next(this.cartItem);
  }

  search(arg:any){

      window.location.href = "/searches/"+arg;
      
  }



  


  }

 




    //     // window.location.href = "/"; 





    // var token = localStorage.getItem('token');
  //  let token = localStorage.getItem(data['token']);
   
  //   const httpOptions ={
  //     Headers : new HttpHeaders({
  //       'Authorization': 'token'
  //     })
  //   }
  //  this.myService.userLogout(httpOptions).subscribe({
  //   next(data){
  //     var token = localStorage.getItem('token');
  //     console.log(data);
  //     console.log(token);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("UserId");
      
  //     // window.location.href = "/"; 
  //   },
  //   error(err){
  //     alert("data not deleted");
  //     console.log(err);
  //   }
    
  //  }) 
  // }



