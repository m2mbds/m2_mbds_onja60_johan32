import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  uri_api = 'http://localhost:8010/api/usersAuthentification';

  getUserAuthentification(loggingUser: User): Observable<any> {
    return this.http.post<User>(this.uri_api, loggingUser);
  }

}
