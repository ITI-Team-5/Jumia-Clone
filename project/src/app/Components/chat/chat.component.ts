import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { ServicesService } from '../Admin/Services/services.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username=localStorage.getItem('name');
  messages =[];
  message ='Hello there';

  constructor(private myserv:ServicesService) { }

  ngOnInit(): void {
    
    Pusher.logToConsole = true;

    const pusher = new Pusher('72334df93db0a254c8c3', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message',function(data) {
      // this.messages.push(data)
      console.log('Hereeeeeeeeeeeeeeeeeeeeee is the data '+data)
    });
  }

  submit(){
    this.myserv.SendChatMsg({
      "username":this.username,
      "message":this.message   
    }).subscribe(()=>this.message ='')
      console.log(this.message)
  }
}
