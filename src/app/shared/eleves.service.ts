import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Eleve } from '../eleves/eleve.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  constructor(private loggingService: LoggingService,private http: HttpClient) { }
  // uri_api = 'https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/api/eleves';
  uri_api = 'http://localhost:8010/api/eleves';

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  getEleves(): Observable<any> {
    return this.http.get<Eleve[]>(this.uri_api);
  }

  getEleve(id: String): Observable<Eleve | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Eleve | undefined>(`${this.uri_api}/${id}`).pipe(
        catchError(this.handleError<Eleve>("Erreur dans le traitement de l'eleve avec id = " + id))
      );
  }

  addEleve(eleve: Eleve): Observable<any> {
    this.loggingService.log(eleve.nom, 'ajouté');
    return this.http.post<Eleve>(this.uri_api, eleve);
  }

  public postFile(fileToUpload: FormData): Observable<any> {
    let upload = "https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/upload";
    //let upload = "http://localhost:8010/upload";
    return this.http.post(upload, fileToUpload).pipe();
  }

  

}
