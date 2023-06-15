import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Matiere } from '../matieres/matiere.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private loggingService: LoggingService,private http: HttpClient) {

   }
  uri_api = 'https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/api/matieres';
  // uri_api = 'http://localhost:8010/api/matieres';

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  getMatieres(): Observable<any> {
    return this.http.get<Matiere[]>(this.uri_api);
  }

  getMatiere(id: string): Observable<Matiere | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Matiere | undefined>(`${this.uri_api}/${id}`).pipe(
        catchError(this.handleError<Matiere>("Erreur dans le traitement de matiere avec id = " + id))
      );
  }

  addEMatiere(matiere: Matiere): Observable<Matiere> {
    this.loggingService.log(matiere.nom, 'ajouté');
    return this.http.post<Matiere>(this.uri_api,matiere);
  }

  public postFile(fileToUpload: FormData): Observable<any> {
    let upload = "https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/upload";
    //let upload = "http://localhost:8010/upload";
    return this.http.post(upload, fileToUpload).pipe();
  }
}
