import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';
  LoggedInAdmin: any;
  lang:string;

  constructor(private trans:TranslateService){
    this.LoggedInAdmin = localStorage.getItem("role")   
    
     // for translation
     this.trans.setDefaultLang('en');
     this.trans.use(localStorage.getItem('lang')||'en')
     
  }

  ngOnInit(): void 
  {
    this.lang=localStorage.getItem('lang')||'en';

  }

}

