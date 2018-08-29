import { Component, OnInit } from '@angular/core';
import { ICursos } from './cursos';
import { CursosService } from './cursos.service';

@Component({
    templateUrl: './curso.component.html'
}) 

export class CursosComponent implements OnInit{
    pageTitle : string = 'Lista Cursos';
    cursos : ICursos[] = [];
    errorMessage: string; 

    constructor(private cursosService: CursosService){
    }
    ngOnInit(): void {
        this.cursosService.getCursos().subscribe(
            cursos => {
                this.cursos = cursos;
                console.log(this.cursos);
            },
            error => this.errorMessage = <any>error 
        )
       
    }
}