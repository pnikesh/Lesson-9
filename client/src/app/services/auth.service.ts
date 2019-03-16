import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  private authToken: any;

  private endpoint = 'http://localhost:3000/api/contact-list/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  constructor(
    private http: HttpClient,
    private jwtservice: JwtHelperService) {

      this.user = new User();
     }

     public registerUser(user: User ): Observable<any>{
       return this.http.post<any>(this.endpoint + 'register', user, this.httpOptions);
     }

     public authenticateUser(user: User ): Observable<any>{
      return this.http.post<any>(this.endpoint + 'login', user, this.httpOptions);
    }

    public storeUserData(token: any, user: User){
      localStorage.setItem('id_token', 'Barer' + token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }

    public logout(user: User ): Observable<any>{
      this.authToken = null;
      this.user = null;
      localStorage.clear();

      return this.http.get<any>(this.endpoint + 'logout', this.httpOptions);
    }

    public LoggedIn(): boolean{
      return !this.jwtservice.isTokenExpired(this.authToken);
    }

}
