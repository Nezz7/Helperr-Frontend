import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user= new User();
  img : string;
  value : string
  selectedFile : File = null; 
  token : string;
  description : boolean=false;
  onOverview : boolean = false;
  institution : boolean;
  onInstitution : boolean;
  skills : boolean;
  occupation: boolean=false;
  onOccupation : boolean=false;
  addSkill : boolean =false;
  deleteSkill : boolean =false;
  constructor(private userservice :UserService,private authService : AuthService,private http: HttpClient,private router : Router) { 
     this.token = this.authService.getToken();
    this.img='http://localhost:8000/api/user/getavatar?token='+this.token;
  }
  ngOnInit() {
    this.onGetProfile();
 }
 onGetProfile (){
   this.userservice.getProfile()
   .subscribe(
       data  =>{this.user=data,
        this.description=(this.user.description==null);
        this.institution=(this.user.institution==null);
        this.skills=(this.user.skills==null);
        this.occupation=(this.user.occupation==null);
      },
       error=>console.log(error)
   );
 }
 onFiledSelected (event){
   this.selectedFile = <File> event.target.files[0];
   const fd = new FormData();
   fd.append('photo',this.selectedFile);
   this.http.post('http://localhost:8000/api/user/uploadavatar?token='+this.token,fd).subscribe(
     res=>console.log(res)
   );
 }
 onUpdateDescription(){
    this.userservice.updateDescription(this.value)
    .subscribe(
      res=>console.log(res),
      error=>console.log(error)
    );
    this.user.description=this.value;
    this.description=(this.user.description==null);
    this.onOverview=false;
    }
 onUpdateOccupation(form : NgForm ){
  this.userservice.updateOccupation(form.value.occupation)
  .subscribe(
      res=>console.log(res),
      error=>console.log(error)
  );
  this.user.occupation=form.value.occupation;
  this.occupation=(this.user.occupation==null);
  this.onOccupation=false;
}
onUpdateInstitution(form : NgForm){
  this.userservice.updateInstitution(form.value.institution)
  .subscribe(
      res=>console.log(res),
      error=>console.log(error)
  );
  this.user.institution=form.value.institution;
  this.institution=(this.user.institution==null);
  this.onInstitution=false;
}
onClickOverview(){
    this.onOverview=true;
}
onAddSkill(form : NgForm){
  this.userservice.addSkill(form.value.skill)
  .subscribe(
    data=> this.user=data,
    error=>console.log(error)
  );
  this.addSkill=false;
}
onDeleteSkill(form : NgForm){
  this.userservice.deleteSkill(form.value.skill)
  .subscribe(
      data=> this.user=data,
    error=>console.log(error)
   
  );
  this.deleteSkill=false;
}

}
