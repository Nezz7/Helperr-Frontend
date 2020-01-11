import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { HelpService } from '../help.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpyou',
  templateUrl: './helpyou.component.html',
  styleUrls: ['./helpyou.component.css']
})
export class HelpyouComponent implements OnInit {
  user = new User();
  token : string;
  img   : string;
  posts  : Post [];
  userPosts : User []=new Array (10);
  deleteSkill : boolean;
  addSkill : boolean;
  skills  : boolean;
  constructor(private userService:UserService,private authService : AuthService,private postService : PostService,private helpService : HelpService,private router : Router) {
    this.token = this.authService.getToken();
    this.img='http://localhost:8000/api/user/getavatar?token='+this.token;
   }

  ngOnInit() {
    this.GetProfile();
   ;
    this.skills=(this.user.skills==null);
  }
  GetProfile (){
    this.userService.getProfile()
    .subscribe(
        data  =>{this.user=data ,this.skills=(this.user.skills==null),this.getHelpYouRequest(this.user.skills)},
        error=>console.log(error)
    );  
  }
  getHelpYouRequest(skills : string []){
      this.postService.getPostSkill(skills).subscribe(
          data => {this.posts=data},
          error => console.log(error)
      );
      }
  onAddSkill(form : NgForm){
    this.userService.addSkill(form.value.skill)
    .subscribe(
      data=>{this.user=data,this.getHelpYouRequest(this.user.skills)},
      error=>console.log(error)
    );
    this.addSkill=false;
  }
  onDeleteSkill(form : NgForm){
    this.userService.deleteSkill(form.value.skill)
    .subscribe(
        data=>{this.user=data,this.getHelpYouRequest(this.user.skills)},
      error=>console.log(error)
     
    );
    this.deleteSkill=false;
  }
  createSession (id : number){
      console.log (id);
      this.helpService.createSession(id).subscribe(
          res => console.log (res),
          error => console.log(error)
      )
      this.router.navigateByUrl('/messages');

  }
}

