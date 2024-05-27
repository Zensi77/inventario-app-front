import { Component, OnInit } from '@angular/core';
import { Producto, Fabricante } from '../Models';
import { ProductoService } from '../producto.service';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css',
})
export class EditarComponent implements OnInit {
  producto: Producto = new Producto();
  private id: number;
  fabricantes: Fabricante[];
  fabricantesFiltrados: Fabricante[];
  terminoBusqueda: string;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private fabricanteService: FabricanteService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Esperamos a que ambos observables se completen antes de asignar los valores, ya que las suscripciones son asincronas
    forkJoin({
      producto: this.productoService.obtenerProducto(this.id),
      fabricantes: this.fabricanteService.obtenerFabricantes(),
    }).subscribe(({ producto, fabricantes }) => {
      this.producto = producto;
      this.fabricantes = fabricantes;
      this.fabricantesFiltrados = fabricantes;
    });
  }

  onSubmit() {
    this.productoService
      .actualizarProducto(this.producto)
      .subscribe((producto) => {
        this.router.navigate(['/productos']); // Redirigimos a la lista de productos
      });
  }

  filtrarFabricantes() {
    this.fabricantesFiltrados = this.fabricantes.filter((fabricante) =>
      fabricante.nombre
        .toLowerCase()
        .includes(this.terminoBusqueda.toLowerCase())
    );
  }
}
