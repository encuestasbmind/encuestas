import { Injectable } from "@angular/core";
import { IUsuarios } from "./usuarios";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class UsuariosService{

    //private usuarioUrl = 'https://devencuestas.000webhostapp.com/api/usuario/read.php';
    //private usuarioUrl = 'api/products/usuarios.json';
    private usuarioUrl = 'http://localhost/encuestas/api/usuario/read.php';
    
    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<IUsuarios[]> {
        return this.http.get<IUsuarios[]>(this.usuarioUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))), 
                catchError(this.handleError)
            )
     }

    getUsuario(id: number): Observable<IUsuarios | undefined >{
        return this.getUsuarios().pipe(
            map((usuarios: IUsuarios[]) => usuarios.find(p => +p.id === id))
        );
    }

    salvarUsuario(usuario: IUsuarios): Observable<IUsuarios> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        
        if(+usuario.id === 0){
            return this.createUsuario(usuario);
        }
        return this.actualizarUsuario(usuario); 
    }

    private createUsuario(usuario: IUsuarios): Observable<IUsuarios>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        usuario.id = null; 
        return this.http.post<IUsuarios>(this.usuarioUrl, usuario, { headers: headers })
            .pipe(
                tap(data => console.log('Crear Usuario: ' + JSON.stringify(data) )),
                catchError(this.handleError)
            );

    }

    private actualizarUsuario(usuario: IUsuarios): Observable<IUsuarios>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = 'http://localhost/encuestas/api/usuario/update.php';
        console.log('Enviando ' + JSON.stringify(usuario));
        return this.http.post<IUsuarios>(url, JSON.stringify(usuario), { headers: headers })
                    .pipe(
                        tap(() => console.log('Actualizar producto ' + usuario.id )),
                        map(() => usuario), 
                        catchError(this.handleError)
                    );
    }

    private handleError(err){
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