import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEventosComponent } from './detalle-eventos.component';

describe('DetalleEventosComponent', () => {
  let component: DetalleEventosComponent;
  let fixture: ComponentFixture<DetalleEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEventosComponent ]
    })
    .compileComponents();
  }));

 beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
