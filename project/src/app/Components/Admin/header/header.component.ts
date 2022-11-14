import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  constructor( private _route:Router ) { }
  name:any;
  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem('userType');
  }

  logout(){
  
    localStorage.clear();
    window.location.href= "/login"
  } 
 
}
