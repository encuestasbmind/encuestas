import { Component, OnInit } from '@angular/core';
import { IUsuarios } from './usuarios';
import { UsuariosService } from './usuarios.service';

@Component({
    selector: 'encuestas-usuarios', 
    templateUrl: './usuarios.component.html'
}) 

export class UsuariosComponent implements OnInit{
    pageTitle : string = 'Lista Usuarios';
    usuarios : IUsuarios[] = [];
    errorMessage: string; 

    constructor(private usuariosService: UsuariosService){
        
    }

    ngOnInit(): void {
        this.usuariosService.getUsuarios().subscribe(
            usuarios => this.usuarios = usuarios, 
            error => this.errorMessage = <any>error 
        )
        //this.usuarios = this.usuariosService.getUsuarios();
    }

}