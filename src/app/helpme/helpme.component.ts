import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from "../post.service";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-helpme',
  templateUrl: './helpme.component.html',
  styleUrls: ['./helpme.component.css']
})
export class HelpmeComponent implements OnInit {
  user = new User();
  newPost = new Post ();
  posts : Post[];
  token : string;
  cond : boolean;
  img : string;
  constructor(private userservice :UserService, private postservice : PostService,private authService : AuthService) {
    this.token = this.authService.getToken();
    this.img='http://localhost:8000/api/user/getavatar?token='+this.token;
   }

  ngOnInit(){
    this.onGetProfile();
    this.getAllHelpRequest();
  }
  onGetProfile (){
    this.userservice.getProfile()
    .subscribe(
        data  =>{this.user=data ,console.log(data)},
        error=>console.log("Here :"+error)
    );  
  }

  postHelpRequest(form : NgForm){
      this.newPost.description=form.value.description;
      this.newPost.short_description=form.value.short_description;
      this.newPost.title=form.value.title;
      this.newPost.cost=form.value.cost;
      this.newPost.status=form.value.status;
      this.newPost.skills=form.value.skills.split(' ');
      this.newPost.maker_id=this.user.id;
      console.log(this.newPost);
      this.postservice.createPost(this.newPost).subscribe(
        res => {console.log (res),this.cond=true},
        error=>{console.log("Here :"+error),this.cond=false}
    );
      
       this.posts.push(this.newPost);
  }
  getAllHelpRequest (){
        this.postservice.getAllPost().subscribe(
          data =>{this.posts=data;console.log(this.posts)},
          res => console.log ("getting "+ res),
        )
  }
  removeHelpRequest(id : number){
      console.log(id);
      this.postservice.deletePost(id).subscribe(
        res=>{console.log(res),this.cond=true},
        err=>{console.log(err),this.cond=false}
      )
      if (this.cond){
      for( var i = 0; i < this.posts.length; i++)
        if ( this.posts[i].id === id) {
          this.posts.splice(i, 1); 
          break;
        }
     }
    }
 
}
