import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  lang:string;

  constructor( private _route:Router,private trans:TranslateService ) { 

    // for translation
    this.trans.setDefaultLang('en');
    this.trans.use(localStorage.getItem('lang')||'en')
  }
  name:any;
  ngOnInit(): void {
    this.lang=localStorage.getItem('lang')||'en';

    this.isLoggedIn = localStorage.getItem("token");
    this.name = localStorage.getItem('name');  }

  logout(){
  
    localStorage.clear();
    window.location.href= "/login"
  } 
  changelang(lang)
  {
    console.log(lang);
    localStorage.setItem('lang',lang);
    window.location.reload()
  }
}
