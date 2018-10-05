import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { EncuestaParcialService } from "./encuesta-parcial.service";
import { IencuestaParcial } from "./encuesta-parcial";

declare var require: any;
@Component({
    selector: 'diligenciar-encuestas-encuestaparcial', 
    templateUrl: './diligenciar-encuesta-parcial.component.html'
}) 
export class DiligenciarEncuestaParcialComponent implements OnInit{
    respuestaSiNo = [{'id':1, 'name':'Si'},
                     {'id':2, 'name':'No'}];



    encuestaEditadas: any; 
    errorMessage: string;
    encuestaParcialForm: FormGroup;

    //Valores para encabezado 
    descEncuestaParcial: IencuestaParcial;
    curso: string; 
    eventoId: string; 
    instructor: string;
    fecha: string; 

    private sub: Subscription;

    constructor(private fb: FormBuilder, 
                private route: ActivatedRoute,
                private router: Router,
                private encuestaParcialService: EncuestaParcialService) {}
    ngOnInit(): void {
        this.encuestaParcialForm = this.fb.group(
            {
                eventoid: '',
                rtasSiNo_1:'', 
                comentarios1: '',
                rtasSiNo_2:'', 
                comentarios2: '',
                rtasSiNo_3:'', 
                comentarios3: '',                                
                rtasSiNo_4:'', 
                comentarios4: '',
                rtasSiNo_5:'', 
                comentarios5: ''                               
            }
        );

        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['eventoid'];
                this.encuestaEditadas = id;
            }
        );
        
        this.getdescEncuestaParcial(this.encuestaEditadas);
        console.log('Datos para diligenciar: ' + this.descEncuestaParcial);
    }

    guardarEncuesta(): void {
        this.encuestaParcialForm.patchValue({
            eventoid: this.encuestaEditadas
        });
        console.log('Saved: ' + JSON.stringify(this.encuestaParcialForm.value));
        console.log('Encuesta editada ' + this.encuestaEditadas);
        const p = { ...this.encuestaEditadas,...this.encuestaParcialForm.value};
        console.log( JSON.stringify(p) );
        this.encuestaParcialService.crearEncuestaParcial(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );        
    }

    onSaveComplete(): void {
        this.encuestaParcialForm.reset();
        this.router.navigate(['/finalizarencuestaparcial']);
    }

    getdescEncuestaParcial(eventoId: string): void {

        console.log('EventoId ' + eventoId);
        this.encuestaParcialService.getEncuestaParcial(eventoId).subscribe(

            descEncuestaParcial => {
                this.descEncuestaParcial = descEncuestaParcial;

                console.log('Datos resultantes ' + JSON.stringify(this.descEncuestaParcial));
                this.curso = this.descEncuestaParcial.curso;
                this.eventoId = this.descEncuestaParcial.id;
                this.instructor = this.descEncuestaParcial.instructor;
                let dateFormat = require('dateformat');
                let now = new Date();
                this.fecha = dateFormat(now, "mmm dd, yyyy");

            },
            error => this.errorMessage = <any>error
        )

    }


}