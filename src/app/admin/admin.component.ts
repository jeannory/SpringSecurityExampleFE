import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from '../services/subscription.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users:any;
  userListSubscription:Subscription;
  userEmail:any=null;
  roles:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private apiService:ApiService,
    private subscriptionService : SubscriptionService
  ) { }

  ngOnInit() {
    this.getUsers(); 
    this.getRoleList(); 
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getUsers() {
    var temp;
    this.apiService.getUsers()
      .subscribe(data => {
        temp = data;
        this.subscriptionService.generateUserList(temp);
        this.userListSubscription=this.subscriptionService.userListSubject.subscribe(
          (users:any[])=>{
            this.users=users;
          }
        ); 
        this.subscriptionService.emitUserListSubject();
      }, err => {
        console.log(err);
      });
  }

  editUserRoles(email:string){
    this.apiService.getRoles(email)
    .subscribe(data=>{
      this.userEmail=email;
      this.selectedItems=data
    }, err => {
      console.log(err);
    });
  }

  getRoleList(){
    this.apiService.getRoleList()
    .subscribe(data=>{
      this.dropdownList=data;
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

  saveRoles(){
    var roles:Role[];
    roles = this.selectedItems;
    var temp;
    this.apiService.putUserRoles(this.userEmail, roles)
      .subscribe(data => {
        temp = data;
        this.subscriptionService.generateUserList(temp);
        this.userListSubscription=this.subscriptionService.userListSubject.subscribe(
          (users:any[])=>{
            this.users=users;
          }
        ); 
        this.subscriptionService.emitUserListSubject();
        this.userEmail=null;
        this.selectedItems=[];
      }, err => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    try{
    this.userListSubscription.unsubscribe();
    }catch(err){
      console.log(err);
    }
  }
}
