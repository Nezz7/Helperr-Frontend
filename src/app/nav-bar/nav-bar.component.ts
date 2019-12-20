import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user = new User();
  img : string;
  name: string;
  constructor(private userservice :UserService,private authService : AuthService) {
    const token = this.authService.getToken();
    this.name=localStorage.getItem('name');
    this.img='http://localhost:8000/api/user/getavatar?token='+token;
   }

  ngOnInit() {
    if (this.name==null){
    this.onGetProfile();
  }
  }
  onGetProfile (){
    this.userservice.getProfile()
    .subscribe(
        data  =>{this.user=data,
          this.name = (this.user).name.split(' ')[0],
          localStorage.setItem('name',this.name)
         }
        ,
        error=>console.log(error)
    );

  }
}
