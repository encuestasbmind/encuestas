import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from "../eventos/eventos.service";
import { EstudianteService } from "../estudiante/estudiante.service";
import { IEstudiante} from "../estudiante/estudiante";
import { IEvento } from "../eventos/eventos";

@Component({
    selector: 'encuestas-encuestafinal', 
    templateUrl: './encuesta-final.component.html'
}) 
export class EncuestaFinalComponent{

    eventoId: string;
    identificacion: string;
    errorMessage = '';
    evento: IEvento;
    estudiante: IEstudiante;

    constructor(private route: ActivatedRoute, 
                private router: Router,
                private eventoService: EventosService,
                private estudianteService: EstudianteService){}
    

    validarEncuestafinal(): void{
        this.errorMessage = '';
        console.log('Iniciar validación de la encuesta con parametros ' + this.eventoId + ' ' + this.identificacion + '' + this.estudiante);
        this.getEventoEstudiante(this.eventoId);
        
    }

    getEventoEstudiante(eventoId: string): void{
        this.eventoService.getOneEvento(+eventoId).subscribe(
                evento => { 
                        this.evento = evento;
                        console.log('Recibido: ' + this.evento.id)
                        if(this.evento.id){
                            console.log('Datos validos');
                            this.router.navigate(['/detalleencuestaparcial/'+this.evento.id]);
                        }else{
                            console.log('El evento ingresado no existe');
                            this.errorMessage = 'El evento ingresado no existe';
                        };
                },
                error => this.errorMessage = <any>error);
    }

    getEstudiante(eventoId: string): void{
        this.estudianteService.getOneEstudiante(+eventoId).subscribe(
                estudiante => { 
                        estudiante = estudiante;
                        console.log('Recibido: ' + this.estudiante.id)
                        if(this.estudiante.id){
                            console.log('Datos validos');
                            this.router.navigate(['/detalleencuestafinal/'+this.estudiante.id]);
                        }else{
                            console.log('El estudiante ingresado no existe');
                            this.errorMessage = 'El estudiante ingresado no existe';
                        };
                },
                error => this.errorMessage = <any>error);
    }



}