import { Component, OnInit } from '@angular/core';
import { IInstructor} from './instructor';
import { InstructorService } from './instructor.service';

@Component({
   
    templateUrl: './instructor.component.html'
}) 

export class InstructorComponent implements OnInit{
    pageTitle : string = 'Lista Instructor';
    instructor : IInstructor[] = [];
    errorMessage: string; 

    constructor(private instructorService: InstructorService){   
    }

    ngOnInit(): void {
        this.instructorService.getInstructores().subscribe(
            instructor => {
                this.instructor = instructor;
                console.log(this.instructor);
            },
            error => this.errorMessage = <any>error 
        )
    }
}