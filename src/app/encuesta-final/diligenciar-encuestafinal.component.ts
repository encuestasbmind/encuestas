import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { EncuestaFinalService } from "./encuesta-final.service";
import { IEncuestaFinal } from "./encuestafinal";

declare var require: any;

@Component({
    selector: 'diligenciar-encuestas-encuestafinal',
    templateUrl: './diligenciar-encuestafinal.component.html'
})
export class DiligenciarEncuestaFinalComponent implements OnInit {

    respuesta = [{ 'id': 5, 'name': 'Totalmente de Acuerdo' },
    { 'id': 4, 'name': 'De Acuerdo' },
    { 'id': 3, 'name': 'Indeciso' },
    { 'id': 2, 'name': 'Desacuerdo' },
    { 'id': 1, 'name': 'Totalmente en Desacuerdo' },
    ];

    respuestaSIoNO = [{ 'ID': 1, 'Name': 'Si' },
    { 'ID': 2, 'Name': 'No' },
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
    eventoId: string;
    fecha: string;
    quiendiligencia: string;
    telefono: string;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private encuestaFinalService: EncuestaFinalService) { }

    ngOnInit(): void {
        this.encuestaFinalForm = this.fb.group(
            {
                eventoid: '',
                rtas_1: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_2: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_3: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_4: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_5: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_6: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_7: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_8: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_9: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_10: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_11: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_12: ['' || null, [Validators.required, Validators.minLength(1)]],
                rtas_13: ['' || null, [Validators.required, Validators.minLength(1)]],
                comentarios1: '',
                comentarios2: '',
                comentarios3: '',
                comentarios4: '',
                comentarios5: '',
                comentarios6: ['' || null, [Validators.required, Validators.minLength(11)]],
                comentarios7: '',
            }
        );

        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['eventoid'];
                const id2 = params['identificacion'];
                this.encuestaEditada = id;
                this.estudiante = id2;

            });
        this.getDescriptorEncuestaFinal(this.encuestaEditada, this.estudiante);
        console.log('Datos para diligenciar: ' + this.descEncuestaFinal);


    }
    guardarEncuestas(): void {
        this.encuestaFinalForm.patchValue({
            eventoid: this.encuestaEditada
        });
        console.log('Saved: ' + JSON.stringify(this.encuestaFinalForm.value));
        console.log('Encuesta Editada ' + this.encuestaEditada);
        const p = { ...this.encuestaEditada, ...this.encuestaFinalForm.value };
        console.log(JSON.stringify(p));
        this.encuestaFinalService.crearEncuestaFinal(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }
    onSaveComplete(): void {
        this.encuestaFinalForm.reset();
        this.router.navigate(['/finalizarencuestaparcial']);
    }


    getDescriptorEncuestaFinal(eventoId: string, identificacion: string): void {

        console.log('EventoId ' + eventoId);
        this.encuestaFinalService.getEventodesfinal(eventoId, identificacion).subscribe(

            descEncuestaFinal => {
                this.descEncuestaFinal = descEncuestaFinal;

                console.log('Datos resultantes ' + JSON.stringify(this.descEncuestaFinal));
                this.estudiante_id = this.descEncuestaFinal.estudiante_id;
                this.instructor = this.descEncuestaFinal.instructor;
                this.curso = this.descEncuestaFinal.curso;
                this.eventoId = this.descEncuestaFinal.id;



                let dateFormat = require('dateformat');
                let now = new Date();
                this.fecha = dateFormat(now, "mm dd, yyyy");
                this.quiendiligencia = this.descEncuestaFinal.nombres + ' ' + this.descEncuestaFinal.apellidos;
                this.email = this.descEncuestaFinal.email;

            },
            error => this.errorMessage = <any>error
        )

    }
}




