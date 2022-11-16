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
  constructor(private _route:Router, public myService: ServicesService ) {   }

  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("userType")
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
   
  }

  logout(){
  
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("UserId");
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

}

