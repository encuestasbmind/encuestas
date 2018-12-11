import { Component, OnInit, Inject } from '@angular/core';
import { Ireporte } from './reporte';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { APP_CONFIG, IAppConfig } from '../app.config';

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
  fechaInicial: string; 
  fechaFinal: string; 
  reporte: Ireporte;

  constructor(private fb: FormBuilder, 
              @Inject(APP_CONFIG) public config: IAppConfig ) { }

  ngOnInit(): void {
    this.reporteForm = this.fb.group(
      {
        encuesta:['' || null, [Validators.required]],
        eventoid:['' || null, [Validators.required]],
        fechaInicial:['' || null, [Validators.required]],

      }
    );

      this.eventoid = ''; 
      this.fechaInicial = 'undefined';
      this.encuesta ='-1';

  }

  getReportes(): void {

    this.reporteForm.patchValue({
      eventoid: this.eventoid,
    
  });
    console.log('Recibido: ' + this.eventoid );
    console.log('Encuesta: ' + this.encuesta );
    const p = {...this.reporteForm.value};
    console.log( JSON.stringify(p));
    var el = document.getElementById('report');
    let urlReporte =  this.config.reporteEndpoint + "reportes/reporteevento.php?" + 
                      "eventoid=" + this.eventoid + 
                      "&tipo_encuesta="+ this.encuesta +
                      "&fecha_inicial="+ this.fechaInicial + 
                      "&fecha_final="+ this.fechaFinal;
    console.log(urlReporte);
    el.setAttribute("src", urlReporte);


  }


}