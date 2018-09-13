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

    respuesta = [{'id':1, 'name':'Totalmente de Acuerdo'},
    {'id':2, 'name':'De Acuerdo'},
    {'id':3, 'name':'Indeciso'},
    {'id':4, 'name':'Desacuerdo'},
    {'id':5, 'name':'Totalmente en Desacuerdo'},
];

    respuestaSIoNO = [{'ID':1, 'Name':'Si'},
                      {'ID':2, 'Name':'No'},
                     ];
                     
                     
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
                private encuestaFinalService: EncuestaFinalService){ }

    ngOnInit(): void {
        this.encuestaFinalForm = this.fb.group(
            {
                eventoid: '',
                rtas_1:'', 
                rtas_2:'', 
                rtas_3:'', 
                rtas_4:'',
                rtas_5:'', 
                rtas_6:'', 
                rtas_7:'', 
                rtas_8:'', 
                rtas_9:'',
                rtas_10:'', 
                rtas_11:'',
                rtas_12:'', 
                rtas_13:'', 
                
                comentarios1: '',
                comentarios2: '',
                comentarios3: '',                                
                comentarios4: '',
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
    guardarEncuestas(): void {
        this.encuestaFinalForm.patchValue({
            eventoid: this.encuestaEditada
        });
        console.log('Saved: ' + JSON.stringify(this.encuestaFinalForm.value));
        console.log('Encuesta Editada ' + this.encuestaEditada);
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