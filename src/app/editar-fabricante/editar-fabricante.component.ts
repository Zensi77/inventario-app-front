import { Component } from '@angular/core';
import { Producto, Fabricante } from '../Models';
import { ProductoService } from '../producto.service';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-fabricante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-fabricante.component.html',
  styleUrl: './editar-fabricante.component.css',
})
export class EditarFabricanteComponent {
  fabricante: Fabricante = new Fabricante();
  private id: number;

  constructor(
    private fabricanteService: FabricanteService,
    private router: Router, // Realiza el enrutado
    private route: ActivatedRoute // Obtiene la ruta actual
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.fabricanteService.obtenerFabricante(this.id).subscribe((fabricante) => {
      this.fabricante = fabricante;
    });
  }

  onSubmit() {
    this.fabricanteService.editarFabricante(this.fabricante).subscribe((fabricante) => {
      this.router.navigate(['/fabricantes']);
    });
  }
}
