import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  tokenSubscription:Subscription;
  token:string;

  constructor(
    private authGuardService :AuthGuardService,
    private router:Router,
    private subscriptionService: SubscriptionService
  ){ }

  ngOnInit() {
          //display login or login at start
          this.token=localStorage.getItem('token');
          //display login or login when connect or disconnect
          this.tokenSubscription=this.subscriptionService.tokenSubject.subscribe(
            (token:string)=>{
              this.token=token;
            }
          )
  }

  public logout() : void{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.subscriptionService.emitTokenSubject();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    try{
    this.tokenSubscription.unsubscribe();
    }catch(err){
      console.log(err);
    }
  }

}
