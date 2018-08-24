import { Component } from "@angular/core";
import { EncuestaParcialService } from './encuesta-parcial.service';
import { IEventoEstudiante } from './eventoestuadiante'

@Component({
    selector: 'encuestas-encuestaparcial', 
    templateUrl: './encuesta-parcial.component.html'
}) 
export class EncuestaParcialComponent{

    eventoId: string;
    identificacion: string;
    errorMessage = '';

    constructor(private encuestaParcialService: EncuestaParcialService){

    }

    validarRealizarEncuesta(): void{
        console.log('Iniciar validación de la encuesta con parametros ' + this.eventoId + ' ' + this.identificacion );
        let p = this.encuestaParcialService.getEventoEstudiante(this.eventoId,this.identificacion )
        if(!p){
            console.log('No hay datos validos');
            this.errorMessage = 'No hay datos validos';
        }
    }



}