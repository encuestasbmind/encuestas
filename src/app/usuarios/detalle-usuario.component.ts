import { Component, OnInit } from '@angular/core';
import { IUsuarios } from './usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'pm-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  pageTitle: string = 'Detalle de usuario';
  errorMessage = '';
  usuario: IUsuarios

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private usuariosService: UsuariosService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 
    this.getUsuario(+id);
  }

  getUsuario(id: number) {
    this.usuariosService.getUsuario(id).subscribe(
      usuario => this.usuario = usuario, 
      error => this.errorMessage = <any>error);
  }

  onBack(): void{
    this.router.navigate(['/usuarios'])
  }

}
