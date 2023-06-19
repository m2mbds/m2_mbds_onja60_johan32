import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../subjects/subjects.models';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  constructor(private http: HttpClient) { }
  uri_api = 'http://localhost:8010/api/subjects';
  //uri_api = 'https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/api/subjects';
  getSubject(): Observable<any> {
    return this.http.get<Subject[]>(this.uri_api);
  }

  getSubjectById(id:Number): Observable<any> {
    return this.http.get<Subject>(`${this.uri_api}/${id}`);
  }

}
