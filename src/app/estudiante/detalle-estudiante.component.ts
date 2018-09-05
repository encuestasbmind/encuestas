import { Component, OnInit } from '@angular/core';
import { IEstudiante} from './estudiante';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from './estudiante.service';

@Component({
//  selector: 'pm-detalle-usuario',
 // templateUrl: './detalle-eventos.component.html'
 // styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleEstudianteComponent implements OnInit {
  pageTitle: string = 'Detalle de estudiante';
  errorMessage = '';
  estudiante: IEstudiante

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private estudiantesService: EstudianteService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 
    this.getEstudiante(+id);
  }

  getEstudiante(id: number) {
    this.estudiantesService.getEstudiante(id).subscribe(
      estudiante => this.estudiante = estudiante, 
      error => this.errorMessage = <any>error);
  }

  onBack(): void{
    this.router.navigate(['/estudiante'])
  }

}