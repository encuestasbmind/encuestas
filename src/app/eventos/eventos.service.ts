import { Injectable } from "@angular/core";
import { IEvento} from "./eventos";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
})
export class EventosService{

   // private usuarioUrl = 'https://devencuestas.000webhostapp.com/api/usuario/read.php';
    private eventoUrl = 'api/products/eventos.json';
    constructor(private http: HttpClient) {}

    getEventos(): Observable<IEvento[]> {
        return this.http.get<IEvento[]>(this.eventoUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    getEvento(id: number): Observable<IEvento | undefined >{
        return this.getEventos().pipe(
            map((eventos: IEvento[]) => eventos.find(p => +p.id === id))
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