import { Component } from '@angular/core';
import { Ireporte } from './reporte';

@Component({
  templateUrl: './reporte.component.html'
})
export class ReporteComponent {
  public pageTitle = 'Reporte';

  eventoid:string;
  reporte: Ireporte;

  getReportes(): void {

      console.log('Recibido: ' + this.eventoid);
      var el = document.getElementById('report');
      el.setAttribute("src","http://localhost/encuestas/app/reportes/reporteevento.php?eventoid=" + this.eventoid);
  
  }
  
 


}