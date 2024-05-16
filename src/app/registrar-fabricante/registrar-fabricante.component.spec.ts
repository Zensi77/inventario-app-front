import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFabricanteComponent } from './registrar-fabricante.component';

describe('RegistrarFabricanteComponent', () => {
  let component: RegistrarFabricanteComponent;
  let fixture: ComponentFixture<RegistrarFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFabricanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
