import { Component } from '@angular/core';
import { Fabricante, Producto } from '../Models';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router'; //Sirve para redirigir a otra ruta
import { FormsModule } from '@angular/forms'; // Se importa FormsModule para poder usar ngModel
import { FabricanteService } from '../fabricante.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Servicio para mostrar notificaciones
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css',
})
export class RegistrarProductoComponent {
  fabricantes: Fabricante[]; // Se crea un array de fabricantes
  producto: Producto = new Producto();
  terminoBusqueda: string = '';

  constructor(
    private productoService: ProductoService,
    private fabricanteService: FabricanteService,
    private enrutador: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Se obtienen los fabricantes
    this.fabricanteService
      .obtenerFabricantes()
      .subscribe((fabricantes) => (this.fabricantes = fabricantes));
  }

  // Metodo para registrar un producto
  onSubmit() {
    this.productoService
      .agregarProducto(this.producto)
      .subscribe((producto) => {
        this.toastr.success(
          'Producto registrado exitosamente',
          'Producto registrado'
        );
      });
  }

  filtrarFabricantes(): Fabricante[] {
    if (!this.terminoBusqueda) {
      // Si el término de búsqueda está vacío, retornar todos los fabricantes
      return this.fabricantes;
    } else {
      // Filtrar los fabricantes cuyo nombre coincida con el término de búsqueda
      return this.fabricantes.filter((fabricante) =>
        fabricante.nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }
}
