import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICursos } from "./cursos";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { CursosService } from './cursos.service';



@Component({
    templateUrl: './curso-editar.component.html'
})
export class EditarCursosComponent implements OnInit {

    pageTitle: string = 'Editar cursos';
    errorMessage: string;
    cursosForm: FormGroup;
    idRecibido: number;

    curso: ICursos;
    private sub: Subscription;

    private validationMessages: { [key: string]: { [key: string]: string } };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cursosService: CursosService) {
        this.validationMessages = {};

    }

    ngOnInit(): void {

        this.cursosForm = this.fb.group({

            id: '',
            nombre_cur: '',
            horas: '',
            fabricante_id: '',
            categorias_id: ''

        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCurso(id);
            }

        );
    }
    getCurso(id: number): void {
        console.log('Id Recibido ' + id);
        this.idRecibido = id;
        console.log('getCurso Id Recibido' + this.idRecibido);
        this.cursosService.getCurso(id)
            .subscribe(
                (cursos: ICursos) => this.onCursoRetrieved(cursos),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onCursoRetrieved(curso: ICursos): void {
        this.curso = curso;
        console.log("Cursos para post " + this.curso);
        if (!curso) {
            this.pageTitle = 'Agregar curso';
        } else {
            this.pageTitle = `Editar curso: ${this.curso.nombre_cur}`;

            this.cursosForm.patchValue({
                id: this.curso.id,
                nombre_cur: this.curso.nombre_cur,
                horas: this.curso.horas,
                fabricante_id: this.curso.fabricante_id,
                categorias_id: this.curso.categorias_id,
            });
        }
    }

    saveCurso(): void {
        let p = Object.assign({}, this.curso, this.cursosForm.value);
        console.log('save curso this.curso ' + JSON.stringify(this.curso));
        console.log('save curso p ' + JSON.stringify(p));
        this.cursosService.salvarCurso(p, this.idRecibido)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSaveComplete(): void {
        this.cursosForm.reset();
        this.router.navigate(['/curso']);
    }
}