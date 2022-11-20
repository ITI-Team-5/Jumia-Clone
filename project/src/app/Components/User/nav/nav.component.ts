import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { data } from 'jquery';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
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
lang:string;

//google
user: SocialUser;
loggedIn: boolean;
  constructor(  private socialAuthService: SocialAuthService ,private trans:TranslateService,public myservice: ServicesService ,private route: ActivatedRoute ) { 

    this.myservice.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })

    // for translation
    this.trans.setDefaultLang('en');
    this.trans.use(localStorage.getItem('lang')||'en')
    
    }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // console.log('el user ahooo'+this.user.name)
     
    });

    this.lang=localStorage.getItem('lang')||'en';

    this.LoggedInAdmin = localStorage.getItem("role")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
     this.myservice.getAllProducts(this.page).subscribe((response:any)=>{
      this.products = response.data;
      this.total = response.total;
    })

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
     this.socialAuthService.signOut();

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



