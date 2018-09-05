import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario.component';
import { DetalleInstructorComponent } from './instructor/detalle-instructor.component';
import { WelcomeComponent } from './home/welcome.component';
import { EditarCursosComponent } from './cursos/cursos-editar.component';
import { EditarUsuarioComponent } from './usuarios/usuario-editar.component';
import { EditarInstructorComponent } from './instructor/instructor-editar.component';
import { EventosComponent} from './eventos/eventos.component';
import { DetalleEventosComponent } from './eventos/detalle-eventos.component';
import { EditareventoComponent } from './eventos/evento-editar.component';
import { CursosComponent } from './cursos/curso.component';
import { InstructorComponent } from './instructor/instructor.component';
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
    EditarCursosComponent,
    DetalleEventosComponent,
    EditareventoComponent,
    InstructorComponent,
    EditarInstructorComponent,
    DetalleInstructorComponent, 
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
      { path: 'instructor', component: InstructorComponent },
      { path: 'detalleencuestaparcial/:eventoid', component: DiligenciarEncuestaParcialComponent },
      { path: 'usuarios/:id', component: DetalleUsuarioComponent },
      { path: 'eventos/:id', component: DetalleEventosComponent },
      { path: 'cursos/:id', component: DetalleCursosComponent },
      { path: 'instructor/:id', component: DetalleInstructorComponent },
      { path: 'editarUsuario/:id', component: EditarUsuarioComponent }, 
      { path: 'editarEvento/:id', component: EditareventoComponent }, 
      { path: 'editarCursos/:id', component: EditarCursosComponent },
      { path: 'editarInstructor/:id', component:EditarInstructorComponent},
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
