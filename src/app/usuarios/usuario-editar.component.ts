import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUsuarios } from "./usuarios";

import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuariosService } from './usuarios.service';



@Component({
    templateUrl: './usuario-editar.component.html'
})
export class EditarUsuarioComponent implements OnInit{
    
    pageTitle: string = 'Editar Usuario';
    errorMessage: string;
    usuarioForm: FormGroup;

    usuario: IUsuarios; 
    private sub: Subscription;

    private validationMessages: { [key: string]: { [key: string]: string } };
    
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usuariosService: UsuariosService){

        this.validationMessages = {};

    }

    ngOnInit(): void {
        this.usuarioForm = this.fb.group({
            id: '',
            usuario: '',
            contrasena: '',
            fecha_creacion: '',
            perfil_id: ''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getUsuario(id);
            }

        );
        
    }

    getUsuario(id: number): void{
        console.log('Id Recibido ' + id );
        this.usuariosService.getUsuario(id)
            .subscribe(
                (usuario: IUsuarios) => this.onUsuarioRetrieved(usuario), 
                (error: any) => this.errorMessage = <any>error
            );
    }

    onUsuarioRetrieved(usuario: IUsuarios): void{
        this.usuario = usuario; 
        console.log('Usuario Recibido ' + this.usuario );
        if(!usuario){
            this.pageTitle = 'Agregar usuario';
        }else{
            this.pageTitle = `Editar usuario: ${this.usuario.usuario}`;

            this.usuarioForm.patchValue({
                id: this.usuario.id,
                usuario: this.usuario.usuario, 
                contrasena: this.usuario.contrasena, 
                fecha_creacion: this.usuario.fecha_creacion, 
                perfil_id: this.usuario.perfil_id
            });
        }


    }

    saveUsuario(): void{
        let p = Object.assign({}, this.usuario, this.usuarioForm.value);
        console.log(JSON.stringify(this.usuario));
        console.log(JSON.stringify(p));
        this.usuariosService.salvarUsuario(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSaveComplete(): void {
        this.usuarioForm.reset();
        this.router.navigate(['/usuarios']);
    }

}