import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
      <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{title}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' [routerLink]="['/welcome']">Home</a></li> 
          <li><a class='nav-link' [routerLink]="['/usuarios']">Usuarios</a></li>
          <li><a class='nav-link' [routerLink]="['/eventos']">Eventos</a></li>
          <li><a class='nav-link' [routerLink]="['/curso']">Cursos</a></li>
          <li><a class='nav-link' [routerLink]="['/instructor']">Instructor</a></li>
          <li><a class='nav-link' [routerLink]="['/EncuestaFinal']">Encuesta Final</a></li>  
          <li><a class='nav-link' [routerLink]="['/EncuestaParcial']">Encuesta Parcial</a></li>
          <li><a class='nav-link' [routerLink]="['/reporte']">Reportes</a></li>
          <li><a class='nav-link' [routerLink]="['/carga']">Carga</a></li>

        </ul>
      </nav>
      <div class='container'>
        <router-outlet></router-outlet>
      </div>
      `
})
export class AppComponent {
  title = 'Encuestas';
}
