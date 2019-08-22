import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { AuthGuardService } from '../services/auth-guard.service';
import { Credential } from '../models/credential';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');
  password2 = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  adress = new FormControl('');
  zip = new FormControl('');
  city = new FormControl('');
  deliveryInformation = new FormControl('');
  form: FormGroup;  
  genders:any;
  dropdownList = [];
  selectedItem = [];
  dropdownSettings = {};

  constructor(    
    private router :Router,
    private fb: FormBuilder,
    private apiService:ApiService,
    private authGuardService :AuthGuardService
    ) { }

  ngOnInit() {
    this.dropdownList = [
      {id:0, name:"Monsieur"},
      {id:1, name:"Madame"}
      ]
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  public registerUser() : void{
    var user = new User();
    user.email = this.email.value;
    user.password = this.password.value;
    user.gender = this.selectedItem[0].name;
    user.firstName = this.firstName.value;
    user.lastName = this.lastName.value;
    user.phoneNumber = this.phoneNumber.value;
    user.adress = this.adress.value;
    user.zip = this.zip.value;
    user.city = this.city.value;
    user.deliveryInformation = this.deliveryInformation.value;
    this.apiService.registerUser(user)
    .subscribe((resp: any) => {
      alert('votre compte a été créé');
      var credential = new Credential ();
      credential.email = this.email.value;
      credential.password = this.password.value;
      this.authGuardService.validateConnection(credential);
   }, err => {
     console.log(err);
     alert(err.message);
   })
  }

  //basic springboot jpa rest provider not using...
  getGenders(){
    this.apiService.getGenders()
    .subscribe(data => {
      this.genders=data;
   }, err => {
     console.log(err);
     alert(err.message);
   })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }
}
