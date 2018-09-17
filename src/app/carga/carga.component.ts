import { Component } from '@angular/core';

@Component({
  templateUrl: './carga.component.html'
})
export class CargaComponent {
  public pageTitle = 'Reporte';
  cargaid:string;

  getCarga(): void {
    console.log('Recibido: ' + this.cargaid);
        }
}

  