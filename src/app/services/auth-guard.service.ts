import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Credential } from '../models/credential';
import { SubscriptionService } from './subscription.service';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  roles:string[];
  role:string;
  email:string;
  exp:string;

  constructor(
    private router:Router,
    private apiService:ApiService,
    private subscriptionService: SubscriptionService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const expectedRole = route.data.expectedRole;
      this.role = null;
      if (localStorage.getItem('token')){

        this.getDecodedAccessToken(localStorage.getItem('token'));
          if(expectedRole!=null){
            this.roles.forEach(element => {
              if(element===expectedRole){
                this.role = element;
              }
            });
            if(this.role==null){
                this.router.navigate( ["/error"] );
                return false
            }
          }
          var current_time = new Date().getTime() / 1000;
          var expLeft = parseInt(this.exp) - current_time;
          //when the token has less than 30 minutes before expiration
          //client requests for refresh token
          //server returns new token with a new expiration date and update roles
          //no action if the token has expired
          if(expLeft < 1800 && expLeft > 0){
            this.apiService.getRefreshToken()
            .subscribe((resp: any) => {
              localStorage.setItem('token', resp.token);
              this.subscriptionService.emitTokenSubject();
              this.getDecodedAccessToken(resp.token);
           }, err => {
             console.log(err);
             alert(err.message);
           })
          }
          if(current_time > parseInt(this.exp)){
            // Destroy local session; redirect to /login
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.subscriptionService.emitTokenSubject();
            alert("Your session has expired, please provide Login!")
            this.router.navigate( ["/login"] );
          }
        return true;
      }
        else  {
        this.subscriptionService.emitTokenSubject();
        alert("You are currently not logged in, please provide Login!")
        this.router.navigate( ["/login"] );
        return false
      }
}

validateConnection(credential : Credential){
  this.apiService.validateConnection(credential)
  .subscribe((resp: any) => {
     localStorage.setItem('token', resp.token);
     this.subscriptionService.emitTokenSubject();
     this.getDecodedAccessToken(resp.token);
    this.router.navigate(['/space']);
  }, err => {
    console.log(err);
    alert(err.message);
  })
}

getDecodedAccessToken(token: string): void {
  try{
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let roles = decodedJwtData.roles+ '';
    this.exp = decodedJwtData.exp;
    this.roles= roles.split(",");
    this.email=decodedJwtData.sub+'';
    localStorage.setItem('email', this.email);
  }
  catch(Error){
    console.log(Error);
  }
}

}
