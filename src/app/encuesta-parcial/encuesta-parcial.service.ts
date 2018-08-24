import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IEventoEstudiante } from './eventoestuadiante'

@Injectable({
    providedIn: 'root'
})
export class EncuestaParcialService{

    constructor(private http: HttpClient) { }
    
    getEventoEstudiante(eventoId: string, identificacion: string): Observable<IEventoEstudiante> {
        const url = 'http://localhost/encuestas/api/eventoestudiante/readeventoxestudiante.php?eventoid=' + eventoId + '&estudianteid=' + identificacion;
        console.log(url);
        return this.http.get<IEventoEstudiante>(url)
                .pipe(
                    tap(data => console.log('get datos' + JSON.stringify(data))),
                    catchError(this.handleError)
                );
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }

}