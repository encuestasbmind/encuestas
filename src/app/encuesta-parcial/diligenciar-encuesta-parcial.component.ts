import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

@Component({
    selector: 'diligenciar-encuestas-encuestaparcial', 
    templateUrl: './diligenciar-encuesta-parcial.component.html'
}) 
export class DiligenciarEncuestaParcialComponent implements OnInit{

    encuestaParcialForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.encuestaParcialForm = this.fb.group(
            {}
        )
    }

}