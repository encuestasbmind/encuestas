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
        this.eventoService.getOneEvento(+this.eventoId).subscribe(
            evento => { 
                    this.evento = evento;
                    if(this.evento.id){
                        let currentDate = new Date();
                        var parts =this.evento.fecha_inicio.split('-');
                        var initialDate = new Date(+parts[0], +parts[1] - 1, +parts[2]); 
                        var timeDiff = Math.abs(currentDate.getTime() - initialDate.getTime());
                        var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if(this.evento.estado_evento==='1'|| daysDiff===2){
                                this.router.navigate(['/detalleencuestaparcial/'+this.evento.id]);
                        }else{
                            this.errorMessage = 'El evento no se encuentra habilitado o no se encuentra en el segundo día';
                        }
                    }else{
                        this.errorMessage = 'El evento ingresado no existe';
                    };
            },
            error => this.errorMessage = <any>error);

        
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

    onEventoRetrieved(evento: IEvento): void{
        this.evento = evento; 
        console.log("Espacio para validaciones. Evento recibido " + JSON.stringify(this.evento) );
        this.getEventoEstudiante(this.eventoId);
    }

}