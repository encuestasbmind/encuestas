import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEvento} from "./eventos";

import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EventosService } from './eventos.service';



@Component({
    templateUrl: './evento-editar.component.html'
})
export class EditareventoComponent implements OnInit{
    
    pageTitle: string = 'Editar evento';
    errorMessage: string;
    eventoForm: FormGroup;

    evento: IEvento; 
    private sub: Subscription;

    private validationMessages: { [key: string]: { [key: string]: string } };
    
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private eventosService: EventosService){

        this.validationMessages = {};

    }

    ngOnInit(): void {
        this.eventoForm = this.fb.group({
            id: '', 
            fecha_inicio:'',
            fecha_final: '', 
            ev_obs: '', 
            curso_id: '',
            instructor_id: '',
            tipo_delivery_id: '',
            estado_id: '',
            ciudad_id:'',
            pais_id: ''

        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getEvento(id);
            }

        );
    }
    getEvento(id: number): void{
        console.log('Id Recibido ' + id );
        this.eventosService.getEvento(id)
            .subscribe(
                (evento: IEvento) => this.onEventoRetrieved(evento), 
                (error: any) => this.errorMessage = <any>error
            );
    }

    onEventoRetrieved(evento: IEvento): void{
        this.evento = evento; 

        if(+this.evento.id === 0){
            this.pageTitle = 'Agregar evento';
        }else{
            this.pageTitle = `Editar evento: ${this.evento.fecha_inicio}`;
        }

        this.eventoForm.patchValue({
            id: this.evento.id , 

            fecha_inicio: this.evento.fecha_inicio ,

            fecha_final: this.evento.fecha_final , 

            ev_obs: this.evento.ev_obs , 

            cursos_id: this.evento.cursos_id ,

            instructor_id: this.evento.instructor_id ,

            tipo_delivery_id: this.evento.tipo_delivery_id ,

            estado_id:this.evento.estado_id ,

            ciudad_id:this.evento.ciudad_id ,
            
            pais_id: this.evento.pais_id ,
            
        });
    }

    saveEvento(): void{
        let p = Object.assign({}, this.evento, this.eventoForm.value);
        console.log(JSON.stringify(this.evento));
        console.log(JSON.stringify(p));
        this.eventosService.salvarEvento(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSaveComplete(): void {
        this.eventoForm.reset();
        this.router.navigate(['/eventos']);
    }

}