import { Component, OnInit } from '@angular/core';
import { IInstructor} from './instructor';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from './instructor.service';

@Component({

  templateUrl: './detalle-instructor.component.html'
 
})
export class DetalleInstructorComponent implements OnInit {
  pageTitle: string = 'Detalle de instructor';
  errorMessage = '';
  instructor: IInstructor

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private instructorService: InstructorService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 
    this.getInstructor(+id);
  }

  getInstructor(id: number) {
    this.instructorService.getInstructor(id).subscribe(
      instructor => this.instructor = instructor, 
      error => this.errorMessage = <any>error);
  }

  onBack(): void{
    this.router.navigate(['/instructor'])
  }

}