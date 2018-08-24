import { Component } from "@angular/core";

@Component({
    selector: 'encuestas-encuestaparcial', 
    templateUrl: './encuesta-parcial.component.html'
}) 
export class EncuestaParcialComponent{

    eventoId: string;
    identificacion: string;

    validarRealizarEncuesta(): void{
        console.log('Iniciar validación de la encuesta con parametros ' + this.eventoId + ' ' + this.identificacion );
    }



}