import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { data } from 'jquery';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
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
products:any[]=[];
lang:string;
  constructor( private trans:TranslateService,public myservice: ServicesService ,private route: ActivatedRoute ) { 
    this.myservice.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })

    // for translation
    this.trans.setDefaultLang('en');
    this.trans.use(localStorage.getItem('lang')||'en')
    
    }

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang')||'en';

    this.LoggedInAdmin = localStorage.getItem("role")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
    this.CartItemFun()
    if(!this.cartItem){
      this.cartItem = 0 ;
    }

    
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
  search(){
    if(this.title !=""){
      this.products = this.products.filter((res:any)=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
      })
  }else{
    this.ngOnInit()
  }
    console.log(this.title.toLocaleLowerCase())
  }

  changelang(lang)
  {
    console.log(lang);
    localStorage.setItem('lang',lang);
    window.location.reload()
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



