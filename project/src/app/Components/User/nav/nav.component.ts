import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
lang:string;
  constructor(private trans:TranslateService,private _route:Router, public myService: ServicesService ) 
  {  
    this.trans.setDefaultLang('en');
    this.trans.use(localStorage.getItem('lang')||'en')
   }

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang')||'en';

    this.LoggedInAdmin = localStorage.getItem("userType")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
    if(this.LoggedInAdmin == 'admin'){
      this.flag = true; //admin 
    }
    if(!this.LoggedInAdmin){
        window.location.href = '/';
    }
  }

  logout(){
  
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("adminId");
    localStorage.removeItem("userType");
    localStorage.removeItem("name");
    window.location.href= "/login"
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
  changelang(lang)
  {
    console.log(lang);
    localStorage.setItem('lang',lang);
    window.location.reload()
  }
}

