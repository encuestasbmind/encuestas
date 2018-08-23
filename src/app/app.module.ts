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

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    DetalleUsuarioComponent, 
    WelcomeComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'usuarios', component: UsuariosComponent }, 
      { path: 'usuarios/:id', component: DetalleUsuarioComponent }, 
      { path: 'editarUsuario/:id', component: EditarUsuarioComponent }, 
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
