import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../models/credential';
import { User } from '../models/user';
import { map } from  'rxjs/operators';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  APIEndpoint:any = environment.APIEndpoint;

  constructor(private httpClient: HttpClient,) {}

  public validateConnection(credential:Credential): Observable<Credential> {
    return this.httpClient.post<any>(this.APIEndpoint+'api/UserWebController/validateConnection', credential)
  }

  public registerUser(user:User):Observable<User> {
    return this.httpClient.post<any>(this.APIEndpoint+'api/UserWebController/registerUser', user)
  }

  public getUser(email:string){
    return this.httpClient.get<User[]>(this.APIEndpoint+'api/UserWebController/getUserDto?email=' + email);
  }

  public getRoles(email:string){
    return this.httpClient.get<User[]>(this.APIEndpoint+'api/UserWebController/getRoleDtos?email=' + email);
  }

  public setUser(user:User):any{
    return this.httpClient.put<any>(this.APIEndpoint+'api/UserWebController/setUser', user);
  }

  public getUsers():any{
    return this.httpClient.get<any[]>(this.APIEndpoint+'api/UserWebController/getUsers');
  }

  public getUserbyId(id:string):any{
    return this.httpClient.get<User[]>(this.APIEndpoint+'users/' + id);
  }

  public getRoleList():any{
    return this.httpClient.get<any[]>(this.APIEndpoint+'api/UserWebController/getRoles');
  }

  public putUserRoles(email:string, roles:Role[]):any{
    return this.httpClient.put<any[]>(this.APIEndpoint+'api/UserWebController/putUserRoles?email='+email, roles);
  }

  public getGenders(){
    return this.httpClient.get<any[]>(this.APIEndpoint+'api/UserWebController/getGenders');
  }

}
