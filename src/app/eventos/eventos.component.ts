import { Component, OnInit } from '@angular/core';
import { IEvento } from './eventos';
import { EventosService } from './eventos.service';

@Component({
    //selector: 'encuestas-eventos', 
    templateUrl: './eventos.component.html'
}) 

export class EventosComponent implements OnInit{
    pageTitle : string = 'Lista Eventos';
    eventos : IEvento[] = [];
    errorMessage: string; 

    constructor(private eventosService: EventosService){   
    }

    ngOnInit(): void {
        this.eventosService.getEventos().subscribe(
            eventos => {
                this.eventos = eventos;
                console.log(this.eventos);
            },
            error => this.errorMessage = <any>error 
        )
        //this.usuarios = this.usuariosService.getUsuarios();
    }
}