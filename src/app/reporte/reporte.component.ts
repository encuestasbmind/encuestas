import { Component, OnInit } from '@angular/core';
import { Ireporte } from './reporte';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit{
  public pageTitle = 'Reporte';

  tipoReporte = [
    { 'id': 1, 'name': 'Encuesta Parcial' },
    {'id': 2, 'name': 'Encuesta Final'}];

  encuesta: string; 
  reporteForm: FormGroup;
  eventoid: string;
  reporte: Ireporte;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reporteForm = this.fb.group(
      {
        encuesta: '',
      }
    );
  }

  getReportes(): void {

    this.reporteForm.patchValue({
      eventoid: this.eventoid,
      encuesta: this.encuesta
  });
    console.log('Recibido: ' + this.eventoid );
    console.log('Encuesta: ' + this.encuesta );
    const p = {...this.reporteForm.value};
    console.log( JSON.stringify(p));
    var el = document.getElementById('report');
    let urlReporte = "http://localhost/encuestas/app/reportes/reporteevento.php?eventoid=" + this.eventoid+"&tipo_encuesta="+ this.encuesta;
    console.log(urlReporte);
    el.setAttribute("src", urlReporte);
  }

}