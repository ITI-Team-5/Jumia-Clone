import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  LoggedInAdmin: any;
  constructor(){
    this.LoggedInAdmin = localStorage.getItem("UserId")
    
  }

}

