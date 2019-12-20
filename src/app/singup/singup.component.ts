import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }
  onSignup (form : NgForm){
    this.authService.signup(form.value.username,form.value.email,form.value.password)
    .subscribe(
        response=> console.log(response),
        error => console.log (error),

    );
  }
}
