import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IEventoEstudiante } from '../encuesta-parcial/eventoestuadiante'
import { IEncuestaFinal} from "./encuestafinal";
import { IAppConfig, APP_CONFIG } from "../app.config";
@Injectable({
    providedIn: 'root'
})
export class EncuestaFinalService{

    constructor(private http: HttpClient,
                @Inject(APP_CONFIG) public config: IAppConfig) { }
    
    getEventoEstudiante(eventoId: string, identificacion: string): Observable<IEventoEstudiante> {
        const url = this.config.apiEndpoint + 'eventoestudiante/readeventoxestudiante.php?eventoid=' + eventoId + '&estudianteid=' + identificacion;
        console.log(url);
        return this.http.get<IEventoEstudiante>(url)
                .pipe(
                    tap(data => console.log('get datos' + JSON.stringify(data))),
                    catchError(this.handleError)
                );
    }

    
    getEventodesfinal(eventoId: string, identificacion: string): Observable<IEncuestaFinal> {
        const url = this.config.apiEndpoint + 'evento/readdescdatafinal.php?id=' + eventoId + '&estudiante_id=' + identificacion;
        console.log(url);
        return this.http.get<IEncuestaFinal>(url)
                .pipe(
                    tap(data => console.log('get datos' + JSON.stringify(data))),
                    catchError(this.handleError)
                );
    }

    crearEncuestaFinal(p: any): Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const url = this.config.apiEndpoint + 'respuestas/createfinal.php';
        console.log('Crear: ' + JSON.stringify(p));
        return this.http.post(url, JSON.stringify(p), { headers: headers })
            .pipe(
                tap(data => console.log('Crear Encuesta Final: ' + JSON.stringify(data) )),
                catchError(this.handleError)
          
                );
    
            }

    private handleError(err) {

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