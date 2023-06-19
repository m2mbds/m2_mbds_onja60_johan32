import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Prof } from '../profs/prof.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ProfsService {

  constructor(private loggingService: LoggingService,private http: HttpClient) { }
  //uri_api = 'https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/api/profs';
  uri_api = 'http://localhost:8010/api/profs';

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  getProfs(page: number, limit: number): Observable<any> {
    return this.http.get<Prof[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  getProf(id: string): Observable<Prof | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Prof | undefined>(`${this.uri_api}/${id}`).pipe(
        catchError(this.handleError<Prof>("Erreur dans le traitement du prof avec id = " + id))
      );
  }
  addProf(prof: Prof): Observable<any> {
    this.loggingService.log(prof.nom, 'ajouté');
    return this.http.post<Prof>(this.uri_api,prof);
  }

  public postFile(fileToUpload: FormData): Observable<any> {
    let upload = "https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/upload";
    //let upload = "http://localhost:8010/upload";
    return this.http.post(upload, fileToUpload).pipe();
  }
}
