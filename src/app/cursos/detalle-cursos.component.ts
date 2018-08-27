import { Component, OnInit } from '@angular/core';
import { ICursos} from './cursos';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './cursos.service';

@Component({
//  selector: 'pm-detalle-usuario',
  templateUrl: './detalle-cursos.component.html'
 // styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleCursosComponent implements OnInit {
  pageTitle: string = 'Detalle de eventos';
  errorMessage = '';
  curso: ICursos

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private cursosService: CursosService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 
    this.getCurso(+id);
  }

  getCurso(id: number) {
    this.cursosService.getCurso(id).subscribe(
      curso => this.curso = curso, 
      error => this.errorMessage = <any>error);
  }

  onBack(): void{
    this.router.navigate(['/cursos'])
  }

}