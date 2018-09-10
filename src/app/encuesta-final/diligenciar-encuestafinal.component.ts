import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { EncuestaFinalService } from "./encuesta-final.service";

@Component({
    selector: 'diligenciar-encuestas-encuestafinal', 
    templateUrl: './diligenciar-encuestafinal.component.html'
}) 
export class DiligenciarEncuestaFinalComponent implements OnInit{

    respuestaSiNo = [{'id':1, 'name':'Si'},
                     {'id':2, 'name':'No'}];
    encuestaEditada: any; 
    errorMessage: string;
    encuestaFinalForm: FormGroup;

    //Valores para encabezado 
    curso: string; 
    instructor: string;
    empresa: string;
    cargo:string;
    email:string;
    eventoId: string; 
    fecha:string;
    quiendiligencia:string;
    telefono:string;
    

    private sub: Subscription;

    constructor(private fb: FormBuilder, 
                private route: ActivatedRoute,
                private router: Router,
                private encuestaFinalService: EncuestaFinalService) { }

    ngOnInit(): void {
        this.encuestaFinalForm = this.fb.group(
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
                this.encuestaEditada = id;
            }
        );

        
        this.eventoId = '1';
        this.curso = 'ANGULAR';
        this.instructor = 'JOHAN'; 
        this.fecha = '2018-09-06';
        this.cargo='APRENDIZ';
        this.empresa='BMIND';
        this.email='Johan@bmind.com';
        this.quiendiligencia='Johan Davila';
        this.telefono='33132131';

    }
    guardarEncuesta(): void {
        this.encuestaFinalForm.patchValue({
            eventoid: this.encuestaEditada
        });
        console.log('Saved: ' + JSON.stringify(this.encuestaFinalForm.value));
        console.log('Encuesta editada ' + this.encuestaEditada);
        const p = { ...this.encuestaEditada, ...this.encuestaFinalForm.value };
        console.log( JSON.stringify(p) );
        this.encuestaFinalService.crearEncuestaFinal(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );        
    }
    onSaveComplete(): void {
        this.encuestaFinalForm.reset();
        this.router.navigate(['/welcome']);
    }
}