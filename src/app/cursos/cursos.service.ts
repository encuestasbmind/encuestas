import { Injectable } from "@angular/core";
import { ICursos} from "./cursos";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
})
export class CursosService{

   
    private cursosUrl = 'http://localhost/encuestas/api/curso/read.php';
    constructor(private http: HttpClient) {}

    getCursos(): Observable<ICursos[]> {
        return this.http.get<ICursos[]>(this.cursosUrl).pipe(
          tap(data => console.log('All:' + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    getCurso(id: number): Observable<ICursos | undefined >{
        return this.getCursos().pipe(
            map((cursos: ICursos[]) => cursos.find(p => +p.id === id))
        );
    }

    getOneCurso(id: number): Observable<ICursos>{
        const url = 'http://localhost/encuestas/api/curso/read_one.php?id='+id;
        return this.http.get<ICursos>(url)
            .pipe(
                tap(data => console.log('OneCurso: ' + JSON.stringify(data))),
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