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
import { ReporteComponent} from './reporte/reporte.component';
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
import { EncuestaFinalComponent } from './encuesta-final/encuesta-final.component';
import { DiligenciarEncuestaParcialComponent } from './encuesta-parcial/diligenciar-encuesta-parcial.component';
import { DiligenciarEncuestaFinalComponent } from './encuesta-final/diligenciar-encuestafinal.component';
import { FinalizarEncuestaParcialComponent } from  './encuesta-parcial/finalizar-encuesta-parcial.component';
import { CargaComponent } from './carga/carga.component';
import { APP_CONFIG, AppConfig } from './app.config';



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
    EncuestaFinalComponent,
    EncuestaParcialComponent,
    DetalleCursosComponent,
    DiligenciarEncuestaParcialComponent, 
    DiligenciarEncuestaFinalComponent,
    FinalizarEncuestaParcialComponent,
    ReporteComponent,
    CargaComponent

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
      { path: 'EncuestaFinal', component: EncuestaFinalComponent},
      { path: 'instructor', component: InstructorComponent },
      { path: 'reporte', component: ReporteComponent },
      { path: 'carga', component: CargaComponent },
      { path: 'detalleencuestaparcial/:eventoid', component: DiligenciarEncuestaParcialComponent },
      { path: 'detalleencuestafinal/:eventoid/:identificacion', component: DiligenciarEncuestaFinalComponent },
      { path: 'finalizarencuestaparcial', component: FinalizarEncuestaParcialComponent },
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
  bootstrap: [AppComponent], 
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule {}
