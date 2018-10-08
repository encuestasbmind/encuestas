import { Injectable, Inject } from "@angular/core";
import { IEstudiante} from "./estudiante";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from "../app.config";
 
@Injectable({
    providedIn: 'root'
})
export class EstudianteService{
    
    private estudianteUrl = this.config.apiEndpoint + 'estudiante/read.php';
    
    constructor(private http: HttpClient, 
                @Inject(APP_CONFIG) public config: IAppConfig) {}

    getEstudiantes(): Observable<IEstudiante[]> {
        return this.http.get<IEstudiante[]>(this.estudianteUrl).pipe(
          tap(data => console.log('All:' + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    getEstudiante(id: number): Observable<IEstudiante | undefined >{
        return this.getEstudiantes().pipe(
            map((estudiante: IEstudiante[]) => estudiante.find(p => +p.id === id))
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

    getOneEstudiante(id: number): Observable<IEstudiante>{
        const url = this.config.apiEndpoint + 'estudiante/read_one.php?id='+id;
        
        return this.http.get<IEstudiante>(url)
            .pipe(
                tap(data => console.log('OneEvento: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }
}