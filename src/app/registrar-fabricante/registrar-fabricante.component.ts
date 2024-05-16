import { Component } from '@angular/core';
import { Fabricante } from '../Models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-fabricante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-fabricante.component.html',
  styleUrl: './registrar-fabricante.component.css'
})
export class RegistrarFabricanteComponent {
  fabricante: Fabricante = new Fabricante();
  constructor() { }
  
  onSubmit() {
    // Lógica para registrar un fabricante
  }
}
