import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFabricanteComponent } from './editar-fabricante.component';

describe('EditarFabricanteComponent', () => {
  let component: EditarFabricanteComponent;
  let fixture: ComponentFixture<EditarFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFabricanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
