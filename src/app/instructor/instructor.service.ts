import { Injectable, Inject } from "@angular/core";
import { IInstructor} from "./instructor";
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';
import { IAppConfig, APP_CONFIG } from "../app.config";
 
@Injectable({
    providedIn: 'root'
})
export class InstructorService{

 
    //private instructorUrl = 'http://localhost/encuestas/api/instructor/read.php';

    constructor(private http: HttpClient, 
                @Inject(APP_CONFIG) public config: IAppConfig) {}

    getInstructores(): Observable<IInstructor[]> {
        return this.http.get<IInstructor[]>(this.config.apiEndpoint + 'instructor/read.php').pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    getInstructor(id: number): Observable<IInstructor | undefined >{
        return this.getInstructores().pipe(
            map((instructor: IInstructor[]) => instructor.find(p => +p.id === id))
        );
    }

    getOneInstructor(id: number): Observable<IInstructor>{
        const url = this.config.apiEndpoint + 'instructor/read_one.php?id='+id;
        
        return this.http.get<IInstructor>(url)
            .pipe(
                tap(data => console.log('OneInstructor: ' + JSON.stringify(data))),
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

    salvarInstructor(instructor: IInstructor, idRecibido: number): Observable<IInstructor> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log('idRecibido ' + idRecibido);
        console.log('instructor en salvar instructor ' + JSON.stringify(instructor))
        if(idRecibido === 0){
            return this.createInstructor(instructor);
        }
        return this.actualizarInstructor(instructor); 
    }

    private createInstructor(instructor: IInstructor): Observable<IInstructor>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const url = this.config.apiEndpoint + 'instructor/create.php';
        console.log('Crear: ' + JSON.stringify(instructor));
        return this.http.post<IInstructor>(url, JSON.stringify(instructor), { headers: headers })
            .pipe(
                tap(data => console.log('Crear Instructor: ' + JSON.stringify(data) )),
                catchError(this.handleError)
            );

    }

    private actualizarInstructor(instructor: IInstructor): Observable<IInstructor>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.config.apiEndpoint + 'instructor/update.php';
        console.log('Enviando ' + JSON.stringify(instructor));
        return this.http.post<IInstructor>(url, JSON.stringify(instructor), { headers: headers })
                    .pipe(
                        tap(() => console.log('Actualizar producto ' + instructor.id )),
                        map(() => instructor), 
                        catchError(this.handleError)
                    );
    }
}