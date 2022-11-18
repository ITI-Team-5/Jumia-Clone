import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  LoggedInAdmin: any;
  navItem: any;
  constructor(){
    this.LoggedInAdmin = localStorage.getItem("role")    
  }
  GetData(data:any){
    this.navItem = data;
   // console.log(data);
    }
}

