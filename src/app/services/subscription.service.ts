import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userListSubject = new Subject<any[]>();
  tokenSubject= new Subject<string>();

  private userList:any=[];
  private token:string=this.getToken();

  constructor() { }

  generateUserList(temp:any){
    this.userList = temp;
  }

  emitUserListSubject():any{
    this.userListSubject.next(this.userList.slice());
  }

  getUserList(){
    return this.userList;
  }

  emitTokenSubject(){
    this.token=this.getToken();
    if(localStorage.getItem('token')){
      this.tokenSubject.next(this.token.slice());
    }else{
      this.tokenSubject.next(null);
    }    
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
