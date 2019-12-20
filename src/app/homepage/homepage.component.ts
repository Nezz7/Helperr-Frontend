import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthService , private router : Router) {}

  ngOnInit() {
    localStorage.clear();
   
  }
  onSignup (form : NgForm){
    this.authService.signup(form.value.username,form.value.email,form.value.password)
    .subscribe(
        response=> console.log(response),
        error => {
          console.log(error);
          localStorage.clear();
        }
    );
    this.authService.signin(form.value.email,form.value.password)
    .subscribe (
      response => {
        console.log(response),
        this.router.navigateByUrl('/profile');
      });
  }
  onSignin(form : NgForm){
    this.authService.signin(form.value.myemail,form.value.mypassword)
    .subscribe (
      response => {
        console.log(response),
        this.router.navigateByUrl('/helpme');
      },
      error => {
        swal('Error', 'Please make sure you have entered the right credentials!', 'error');
        localStorage.clear();
      }
    );
}
}
