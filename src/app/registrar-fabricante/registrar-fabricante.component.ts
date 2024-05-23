import { Component } from '@angular/core';
import { Fabricante } from '../Models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FabricanteService } from '../fabricante.service';
import { Router } from '@angular/router'; // Import the 'Router' class from the correct package

@Component({
  selector: 'app-registrar-fabricante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-fabricante.component.html',
  styleUrl: './registrar-fabricante.component.css'
})
export class RegistrarFabricanteComponent {
  fabricante: Fabricante = new Fabricante();
  constructor(private fabricanteService: FabricanteService, private router: Router) { }
  
  onSubmit() {
    this.fabricanteService.registrarFabricante(this.fabricante).subscribe((response) => {
      console.log(response);
    }
    );
    this.router.navigate(['/fabricantes']);
  }
}
