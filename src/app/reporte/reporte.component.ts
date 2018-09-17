import { Component, OnInit } from '@angular/core';
import { Ireporte } from './reporte';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit{
  public pageTitle = 'Reporte';
  tipoReporte = [{ 'id': 1, 'name': 'Encuesta Parcial' }, {'id': 2, 'name': 'Encuesta Final'},];

  encuestaEditadas: any; 

  reporteForm: FormGroup;
  eventoid: string;
  reporte: Ireporte;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reporteForm = this.fb.group(
      {
        encuesta_Inicio: '',
      }
    );
  }

  getReportes(): void {

    this.reporteForm.patchValue({
      eventoid: this.encuestaEditadas
  });
    console.log('Recibido: ' + this.eventoid );
    const p = {...this.encuestaEditadas,...this.reporteForm.value};
    console.log( JSON.stringify(p));
    var el = document.getElementById('report');
    el.setAttribute("src", "http://localhost/encuestas/app/reportes/reporteevento.php?eventoid=" + this.eventoid);

  }

}