import { Component, OnInit } from '@angular/core';
import { Credential } from '../models/credential';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder }  from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   email = new FormControl('');
   password = new FormControl('');

  constructor(
    private apiService:ApiService,
    private router:Router,
    private authGuardService:AuthGuardService
    ) { }

  ngOnInit() {
  }

   validateConnection(){
     var credential= new Credential();
     credential.email = this.email.value ;
     credential.password = this.password.value ;
     this.authGuardService.validateConnection(credential);
   }
}
