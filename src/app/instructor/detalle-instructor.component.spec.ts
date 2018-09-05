import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInstructorComponent } from './detalle-instructor.component';

describe('DetalleInstructorComponent', () => {
  let component: DetalleInstructorComponent;
  let fixture: ComponentFixture<DetalleInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInstructorComponent ]
    })
    .compileComponents();
  }));

 beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
