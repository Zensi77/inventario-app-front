import { Component } from '@angular/core';
import { Fabricante } from '../Models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FabricanteService } from '../fabricante.service';

@Component({
  selector: 'app-registrar-fabricante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-fabricante.component.html',
  styleUrl: './registrar-fabricante.component.css'
})
export class RegistrarFabricanteComponent {
  fabricante: Fabricante = new Fabricante();
  constructor(private fabricanteService: FabricanteService) { }
  
  onSubmit() {
    this.fabricanteService.registrarFabricante(this.fabricante).subscribe((response) => {
      console.log(response);
    }
    );
  }
}
