import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { SpaceComponent } from './space/space.component';
import { AdminComponent } from './admin/admin.component';
import { SubscriptionService } from './services/subscription.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    SpaceComponent,
    ManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    ApiService, 
    AuthGuardService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    SubscriptionService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
