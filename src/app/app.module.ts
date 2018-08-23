import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario.component';
import { WelcomeComponent } from './home/welcome.component';
import { EditarUsuarioComponent } from './usuarios/usuario-editar.component';

import { EventosComponent} from './eventos/eventos.component';
import { DetalleEventosComponent } from './eventos/detalle-eventos.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    DetalleUsuarioComponent, 
    WelcomeComponent,
    EditarUsuarioComponent,
    EventosComponent,
    DetalleEventosComponent

  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([

      { path: 'usuarios', component: UsuariosComponent }, 
      { path: 'eventos', component: EventosComponent},
      { path: 'usuarios/:id', component: DetalleUsuarioComponent },
      { path: 'eventos/:id', component: DetalleEventosComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
