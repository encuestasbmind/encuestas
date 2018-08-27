import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario.component';
import { WelcomeComponent } from './home/welcome.component';
import { EditarUsuarioComponent } from './usuarios/usuario-editar.component';
import { EventosComponent} from './eventos/eventos.component';
import { DetalleEventosComponent } from './eventos/detalle-eventos.component';
import { EditareventoComponent } from './eventos/evento-editar.component';
import { CursosComponent } from './cursos/curso.component';
import { DetalleCursosComponent } from './cursos/detalle-cursos.component';
import { EncuestaParcialComponent } from './encuesta-parcial/encuesta-parcial.component';
import { DiligenciarEncuestaParcialComponent } from './encuesta-parcial/diligenciar-encuesta-parcial.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    DetalleUsuarioComponent, 
    WelcomeComponent,
    EditarUsuarioComponent,
    EventosComponent,
    CursosComponent,
    DetalleEventosComponent,
    EditareventoComponent, 
    EncuestaParcialComponent,
    DetalleCursosComponent,
    DiligenciarEncuestaParcialComponent

  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: 'curso', component: CursosComponent }, 
      { path: 'usuarios', component: UsuariosComponent }, 
      { path: 'eventos', component: EventosComponent},
      { path: 'EncuestaParcial', component: EncuestaParcialComponent},
      { path: 'detalleencuestaparcial/:eventoid', component: DiligenciarEncuestaParcialComponent },
      { path: 'usuarios/:id', component: DetalleUsuarioComponent },
      { path: 'eventos/:id', component: DetalleEventosComponent },
      { path: 'cursos/:id', component: DetalleCursosComponent },
      { path: 'editarUsuario/:id', component: EditarUsuarioComponent }, 
      { path: 'editarEvento/:id', component: EditareventoComponent }, 
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
