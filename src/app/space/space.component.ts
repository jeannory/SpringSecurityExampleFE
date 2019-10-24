import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  user:User=new User();
  roles:any;

  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  address = new FormControl('');
  zip = new FormControl('');
  city = new FormControl('');
  deliveryInformation = new FormControl('');
  changeUser:boolean=false;
  genders:any;
  dropdownList = [];
  selectedItem = [];
  dropdownSettings = {};

  constructor(
    private apiService:ApiService
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
    this.getUser();
    this.getRoles();
  }

  getUser() {
    var email=localStorage.getItem('email');
    var temp;
    this.apiService.getUser(email)
      .subscribe(data => {
        temp=data;
        this.user = temp;
        this.selectedItem = [];
        this.dropdownList.forEach(element => {
          if(element.name==this.user.gender){
            var id = element.id;
            var name=this.user.gender;
            this.selectedItem=[
              {id , name}
            ]
          }
        });
      }, err => {
        console.log(err);
      });
  }

  getRoles() {
    var email=localStorage.getItem('email');
    this.apiService.getRoles(email)
      .subscribe(data => {
        this.roles = data;
      }, err => {
        console.log(err);
      });
  }

  buttomChangeUser(){
    this.changeUser=true;
  }

  buttomCancelChangeUser(){
    this.changeUser=false;
  }

  setUser(){
    this.user.gender=this.selectedItem[0].name;
    if(this.firstName.value){
      this.user.firstName = this.firstName.value;
    }
    if(this.lastName.value){
      this.user.lastName = this.lastName.value;
    }
    if(this.phoneNumber.value){
      this.user.phoneNumber = this.phoneNumber.value;
    }
    if(this.address.value){
      this.user.address = this.address.value;
    }
    if(this.zip.value){
      this.user.zip = this.zip.value;
    }
    if(this.city.value){
      this.user.city = this.city.value;
    }
    if(this.deliveryInformation.value){
      this.user.deliveryInformation = this.deliveryInformation.value;
    }
    this.apiService.setUser(this.user).subscribe(data=>{
      this.user=data;
      alert("modifications terminées")
      this.changeUser=false;
    }, err => {
      console.log(err);
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }
}
