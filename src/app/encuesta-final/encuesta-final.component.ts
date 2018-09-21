import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from "../eventos/eventos.service";
import { EncuestaFinalService } from "../encuesta-final/encuesta-final.service";
import { EstudianteService } from "../estudiante/estudiante.service";
import { IEstudiante } from "../estudiante/estudiante";
import { IEvento } from "../eventos/eventos";
import { IEventoEstudiante } from "../encuesta-parcial/eventoestuadiante";
import { IEncuestaFinal } from "./encuestafinal";

@Component({
    selector: 'encuestas-encuestafinal',
    templateUrl: './encuesta-final.component.html'
})
export class EncuestaFinalComponent {

    eventoId: string;
    identificacion: string;
    errorMessage = '';
    evento: IEvento;
    estudiante: IEstudiante;
    eventoEstudiante: IEventoEstudiante;
    descEncuestaFinal: IEncuestaFinal;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventoService: EventosService,
        private estudianteService: EstudianteService,
        private encuestaFinalService: EncuestaFinalService) { }


    validarEncuestafinal(): void {
        this.errorMessage = '';
        this.encuestaFinalService.getEventoEstudiante(this.eventoId, this.identificacion).subscribe(
            eventoEstudiante => {
                this.eventoEstudiante = eventoEstudiante;
                if (this.eventoEstudiante) {
                    console.log('Iniciar validación de la encuesta con parametros ' + this.eventoId + ' ' + this.identificacion);
                    this.getEventoEstudiantes(this.eventoId, this.identificacion);
                } else {
                    this.errorMessage = 'El evento o estudiante ingresado no existe';
                }
                if(this.evento.id==null ){
                    this.router.navigate(['/detalleencuestafinal/'+this.evento.id +this.estudiante.id]);
            }else{
                this.errorMessage = 'El evento no se encuentra habilitado o no se encuentra en el segundo día';
            }
              }
                 );
                    }
         
                       getEventoEstudiantes(eventoId: string, identificacion: string): void {

                      this.encuestaFinalService.getEventoEstudiante(eventoId, identificacion).subscribe(
                       eventoEstudiante => {
                          this.eventoEstudiante = eventoEstudiante;
                          console.log('Recibido: ' + this.eventoEstudiante.eventoid + this.eventoEstudiante.estudianteid)
                          if (this.eventoEstudiante.eventoid && this.eventoEstudiante.estudianteid){
                            console.log('Datos validos');
                            this.router.navigate(['/detalleencuestafinal/' + this.eventoEstudiante.eventoid + '/' +this.eventoEstudiante.estudianteid]);
                        } else {
                            console.log('El evento ingresado no existe');
                            this.errorMessage = 'El evento ingresado no existe';
                        };
                    },
                    error => this.errorMessage = <any>error);
            }

            getDescriptorEncuestaFinal (eventoId: string, identificacion: string): void {

                this.encuestaFinalService.getEventodesfinal(eventoId , identificacion).subscribe(

                    descEncuestaFinal => {
                        this.descEncuestaFinal = descEncuestaFinal;

                console.log( this.descEncuestaFinal);
                    },
                    error => this.errorMessage = <any>error 
                )
                
            }       
}