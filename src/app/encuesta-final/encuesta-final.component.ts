import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from "../eventos/eventos.service";
import { EncuestaFinalService } from "../encuesta-final/encuesta-final.service";
import { EstudianteService } from "../estudiante/estudiante.service";
import { IEstudiante } from "../estudiante/estudiante";
import { IEvento } from "../eventos/eventos";
import { IEventoEstudiante } from "../encuesta-parcial/eventoestuadiante";

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

              }
                 );
                      }
        
                  getEventoEstudiantes(eventoId: string, identificacion: string): void {

                      this.encuestaFinalService.getEventoEstudiante(eventoId, identificacion).subscribe(
                       eventoEstudiante => {
                          this.eventoEstudiante = eventoEstudiante;
                          console.log('Recibido: ' + this.eventoEstudiante)
                          if (this.eventoEstudiante) {
                            console.log('Datos validos');
                            this.router.navigate(['' + this.eventoEstudiante]);
                        } else {
                            console.log('El evento ingresado no existe');
                            this.errorMessage = 'El evento ingresado no existe';
                        };
                    },
                    error => this.errorMessage = <any>error);
            }
}