import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from "../app.config";


@Injectable({
    providedIn: 'root'
})
export class CargaService{

    constructor(private http: HttpClient, 
                @Inject(APP_CONFIG) public config: IAppConfig) {}

    public createEventosComplejo(payload: any): Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const url = this.config.apiEndpoint + 'evento/carga.php';
        console.log('Crear: ' + payload);
        return this.http.post(url, payload, { headers: headers })
            .pipe(
                tap(data => console.log('Crear cursos: ' + data )),
                catchError(this.handleError)
            );


    }

    public createEventos(payload: any){
        const url = this.config.apiEndpoint + 'evento/carga.php';
        console.log('Crear: ' + payload);
        return this.http.post(url, payload)
            .pipe(
                tap(data => console.log('Crear cursos: ' + data )),
                catchError(this.handleError)
            );


    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = 'Ocurrio un error : ${err.error.message}';
        } else {
            errorMessage = 'El servidor retorno: ${err.status}, el error del mensaje es: ${err.message}';
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }




}