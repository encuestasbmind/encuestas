import { Component, OnInit } from '@angular/core';
import { IEvento} from './eventos';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from './eventos.service';

@Component({
//  selector: 'pm-detalle-usuario',
  templateUrl: './detalle-eventos.component.html'
 // styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleEventosComponent implements OnInit {
  pageTitle: string = 'Detalle de eventos';
  errorMessage = '';
  evento: IEvento

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private eventosService: EventosService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 
    this.getEvento(+id);
  }

  getEvento(id: number) {
    this.eventosService.getEvento(id).subscribe(
      evento => this.evento = evento, 
      error => this.errorMessage = <any>error);
  }

  onBack(): void{
    this.router.navigate(['/eventos'])
  }

  onReport(): void{
    console.log(this.evento.id);
    window.open("http://localhost/encuestas/app/reportes/reporteevento.php?eventoid=" + this.evento.id); 
  }

}