import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'finalizar-encuestaparcial', 
    templateUrl: './finalizar-encuesta-parcial.component.html'
}) 
export class FinalizarEncuestaParcialComponent{

    constructor(private router: Router) { }


    aceptarEncuesta(): void{
        console.log("Redireccionar" );
        this.router.navigate(['https://bmind.com/']);
    }

}