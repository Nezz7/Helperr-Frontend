import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { HelpService } from '../help.service';
import { Session } from '../models/session.model';
import { NgForm } from '@angular/forms';
import { Message } from '../models/message.model';


@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css']
})
export class AllMessagesComponent implements OnInit {
  user = new User ();
  meSessions : Session[];
  youSessions : Session[];
  curSessions : Session [];
  mysession = new Session();
  message=new Array();
  messages : Message[];
  mymessage= new Message(); 
  msg  : boolean=false;
  constructor(private userService : UserService, private helpService : HelpService) { }

  ngOnInit() {
      this.getProfile();
      this.getSessionMe();
      this.getSessionYou();
   
  }
  getProfile (){
    this.userService.getProfile()
    .subscribe(
        data  =>{this.user=data},
        error=>console.log(error)
    );  
  }
  getSessionMe (){
      this.helpService.getSessionMe().subscribe(
         data => {this.meSessions=data,console.log(data)},
         error => console.log(error),
      );
  }
  getSessionYou (){
    this.helpService.getSessionYou().subscribe(
       data => {this.youSessions=data,console.log("youSession: ");console.log(data);
          this.mysession=this.curSessions[this.curSessions.length-1];
          console.log(this.mysession);
          this.getHeadMessage(this.mysession.id,5);
      },
       error => console.log(error),
    );
  }
  getHeadMessage(id : number,head : number){
      this.helpService.getHeadMessage(id,head).subscribe(
        (m : Message[]) => {this.messages=Object.keys(m).map(function(id){
          let message = m[id];
          // do something with person
          return message;}); 
          
          console.log("Message:");console.log(this.messages)},
        error => console.log(error)
      )
  }
  sendMessage (form : NgForm){
    console.log (form.value.message);
    console.log(this.mysession.id);
    this.helpService.postMessage(this.mysession.id,form.value.message).subscribe(
          res=>{console.log(res),this.getHeadMessage(this.mysession.id,5)},
          error=>console.log(error),
    )
  }
  onSessionMe(){
      this.msg=true;
      this.curSessions=this.youSessions;
      this.mysession=this.curSessions[this.curSessions.length-1];
      console.log(this.curSessions);

  }
  onSessionYou(){
    this.msg=false;
    this.curSessions=this.meSessions;
    this.mysession=this.curSessions[this.curSessions.length-1];
    console.log(this.curSessions);

  }
}
