import { Injectable } from "@angular/core";
import { IEvento} from "./eventos";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
})
export class EventosService{

   //private usuarioUrl = 'https://devencuestas.000webhostapp.com/api/eventos/read.php';
    private eventoUrl = 'http://localhost/encuestas/api/evento/read.php';
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

    getOneEvento(id: number): Observable<IEvento>{
        const url = 'http://localhost/encuestas/api/evento/read_one.php?id=' + id;
        return this.http.get<IEvento>(url)
            .pipe(
                tap(data => console.log('OneEvento: ' + JSON.stringify(data))),
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

    salvarEvento(evento: IEvento): Observable<IEvento> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        
        if(+evento.id === 0){
            return this.createEvento(evento);
        }
        return this.actualizarEvento(evento); 
    }

    private createEvento(evento: IEvento): Observable<IEvento>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        evento.id = null; 
        return this.http.post<IEvento>(this.eventoUrl, evento, { headers: headers })
            .pipe(
                tap(data => console.log('Crear Evento: ' + JSON.stringify(data) )),
                catchError(this.handleError)
            );

    }

    private actualizarEvento(evento: IEvento): Observable<IEvento>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = 'http://localhost/encuestas/api/evento/update.php';
        console.log('Enviando ' + JSON.stringify(evento));
        return this.http.post<IEvento>(url, JSON.stringify(evento), { headers: headers })
                    .pipe(
                        tap(() => console.log('Actualizar producto ' + evento.id )),
                        map(() => evento), 
                        catchError(this.handleError)
                    );
    }
}