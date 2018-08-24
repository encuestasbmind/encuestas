import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from "../eventos/eventos.service";
import { IEvento } from "../eventos/eventos";

@Component({
    selector: 'encuestas-encuestaparcial', 
    templateUrl: './encuesta-parcial.component.html'
}) 
export class EncuestaParcialComponent{

    eventoId: string;
    identificacion: string;
    errorMessage = '';
    evento: IEvento;

    constructor(private route: ActivatedRoute, 
                private router: Router,
                private eventoService: EventosService){

    }

    validarRealizarEncuesta(): void{
        this.errorMessage = '';
        console.log('Iniciar validación de la encuesta con parametros ' + this.eventoId + ' ' + this.identificacion );
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



}