import { Component } from '@angular/core';
import { Fabricante, Producto } from '../Models';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router'; //Sirve para redirigir a otra ruta
import { FormsModule } from '@angular/forms'; // Se importa FormsModule para poder usar ngModel
import { FabricanteService } from '../fabricante.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css',
})
export class RegistrarProductoComponent {
  fabricantes: Fabricante[]; // Se crea un arreglo de fabricantes
  producto: Producto = new Producto();

  constructor(
    private productoService: ProductoService,
    private fabricanteServie: FabricanteService,
    private httpCliente: HttpClient,
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Se obtienen los fabricantes
    this.fabricanteServie
      .obtenerFabricantes()
      .subscribe((fabricantes) => (this.fabricantes = fabricantes));
  }

  // Metodo para registrar un producto
  onSubmit() {
    this.productoService.agregarProducto(this.producto).subscribe(() => {
      this.enrutador.navigate(['/productos']); // Redirige a la ruta /productos cuando se registra un producto
    });
  }
}
