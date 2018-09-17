import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { EncuestaFinalService } from "./encuesta-final.service";
import { IEncuestaFinal } from "./encuestafinal";

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

    descEncuestaFinal: IEncuestaFinal;
    
    private sub: Subscription;
    apellidos: string;
    nombres: string;
    estudiante_id: string;
    instructor: string;
    email: string;
    estudiante: string;
    curso: string;
    constructor(private fb: FormBuilder, 
                private route: ActivatedRoute,
                private router: Router,
                private encuestaFinalService: EncuestaFinalService){ }

     ngOnInit(): void {
        this.encuestaFinalForm = this.fb.group(
            {
                eventoid:'',
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
                const id2 = params['identificacion'];

                this.encuestaEditada = id;
                this.estudiante = id2;
            }
        );

        this.getDescriptorEncuestaFinal(this.encuestaEditada,this.estudiante);
        this.curso=this.descEncuestaFinal.email; 
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


    getDescriptorEncuestaFinal (eventoId: string, identificacion: string): void {

        this.encuestaFinalService.getEventodesfinal(eventoId , identificacion).subscribe(

            descEncuestaFinal => {
                this.descEncuestaFinal = descEncuestaFinal;

        console.log( this.descEncuestaFinal);
            },
            error => this.errorMessage = <any>error 
        )
        
    }
}