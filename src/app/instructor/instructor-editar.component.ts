import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { IInstructor} from "./instructor";

import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { InstructorService } from './instructor.service';



@Component({
    templateUrl: './instructor-editar.component.html'
})
export class EditarInstructorComponent implements OnInit{
    
    pageTitle: string = 'Editar instructor';
    errorMessage: string;
    instructorForm: FormGroup;
    idRecibido: number; 

    instructor: IInstructor; 
    private sub: Subscription;

    private validationMessages: { [key: string]: { [key: string]: string } };
    
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private instructorService: InstructorService){

        this.validationMessages = {};

    }

    ngOnInit(): void {
        
        this.instructorForm = this.fb.group({
            id: '', 
            nombre_inst:'',
            apellidos_inst: '', 
            celular_inst: '', 
            fijo_inst: '',
            email_1: '',
            email_2: ''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getInstructor(id);
            }

        );
    }
    getInstructor(id: number): void{
        console.log('Id Recibido ' + id );
        this.idRecibido = id;
        console.log('getInstructor Id Recibido ' + this.idRecibido );
        this.instructorService.getInstructor(id)
            .subscribe(
                (instructor: IInstructor) => this.onInstructorRetrieved(instructor), 
                (error: any) => this.errorMessage = <any>error
            );
    }

    onInstructorRetrieved(instructor: IInstructor): void{
        this.instructor = instructor; 
        console.log("Instructor para post " + this.instructor);
        if(!instructor){
            this.pageTitle = 'Agregar instructor';
        }else{
            this.pageTitle = `Editar instructor: ${this.instructor.nombre_inst}`;

            this.instructorForm.patchValue({
                id: this.instructor.id , 
                nombre_inst: this.instructor.nombre_inst ,
                apellidos_inst: this.instructor.apellidos_inst , 
                celular_inst: this.instructor.celular_inst , 
                fijo_inst: this.instructor.fijo_inst ,
                email_1: this.instructor.email_1 ,
                email_2: this.instructor.email_2 ,
            });
        }

    }

    saveInstructor(): void{
        let p = Object.assign({}, this.instructor, this.instructorForm.value);
        console.log('save instructor this.instructor '+ JSON.stringify(this.instructor));
        console.log('save instructor p ' + JSON.stringify(p));
        this.instructorService.salvarInstructor(p, this.idRecibido)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSaveComplete(): void {
        this.instructorForm.reset();
        this.router.navigate(['/instructor']);
    }

}