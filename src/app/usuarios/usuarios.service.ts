import { Injectable } from "@angular/core";
import { IUsuarios } from "./usuarios";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
})
export class UsuariosService{

    private usuarioUrl = 'https://devencuestas.000webhostapp.com/api/usuario/read.php';
    //private usuarioUrl = 'api/products/usuarios.json';
    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<IUsuarios[]> {
        return this.http.get<IUsuarios[]>(this.usuarioUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    getUsuario(id: number): Observable<IUsuarios | undefined >{
        return this.getUsuarios().pipe(
            map((usuarios: IUsuarios[]) => usuarios.find(p => +p.id === id))
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