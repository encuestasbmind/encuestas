import { Injectable, Inject } from "@angular/core";
import { ICursos} from "./cursos";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from "../app.config";
 
@Injectable({
    providedIn: 'root'
})
export class CursosService{
    //private cursosUrl = 'http://localhost/encuestas/api/curso/read.php';
    
    constructor(private http: HttpClient, 
                @Inject(APP_CONFIG) public config: IAppConfig) {}

    getCursos(): Observable<ICursos[]> {
        return this.http.get<ICursos[]>(this.config.apiEndpoint + 'curso/read.php').pipe(
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
        const url = this.config.apiEndpoint + 'curso/read_one.php?id='+id;
        
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

    
    salvarCurso(cursos: ICursos, idRecibido: number): Observable<ICursos> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log('idRecibido ' + idRecibido);
        console.log('cursos en salvar cursos' + JSON.stringify(cursos))
        if(idRecibido === 0){
            return this.createCursos(cursos);
        }
        return this.actualizarCursos(cursos); 
    }

    private createCursos(cursos: ICursos): Observable<ICursos>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const url = this.config.apiEndpoint + 'curso/create.php';
        console.log('Crear: ' + JSON.stringify(cursos));
        return this.http.post<ICursos>(url, JSON.stringify(cursos), { headers: headers })
            .pipe(
                tap(data => console.log('Crear cursos: ' + JSON.stringify(data) )),
                catchError(this.handleError)
            );
    }

    private actualizarCursos(cursos: ICursos): Observable<ICursos>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.config.apiEndpoint + 'curso/update.php';
        console.log('Enviando ' + JSON.stringify(cursos));
        return this.http.post<ICursos>(url, JSON.stringify(cursos), { headers: headers })
                    .pipe(
                        tap(() => console.log('Actualizar Cursos ' + cursos.id )),
                        map(() => cursos), 
                        catchError(this.handleError)
                    );
    }
}