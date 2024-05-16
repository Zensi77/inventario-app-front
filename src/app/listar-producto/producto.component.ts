import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../Models';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  selectedProducto: Producto | null = null;

  constructor(
    private productoServicio: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Esto lo que hace es que cuando se cambie de ruta, se vuelva a cargar la lista de productos
    this.route.paramMap.subscribe(() => {
      this.obtenerProductos();
    });
  }

  // metodo para obtener productos
  // subscribe: se suscribe a los cambios de la petición
  // Expresion lambda (productos => this.productos = productos): asigna el resultado de la petición
  obtenerProductos() {
    this.productoServicio
      .obtenerProductos()
      .subscribe((productos) => (this.productos = productos));
  }

  openConfirmModal(producto: Producto) {
    // Se asigna el producto seleccionado
    this.selectedProducto = producto;
    // Se obtiene el elemento modal
    const modalElement = document.getElementById('confirmDeleteModal');
    // Si existe el elemento modal
    if (modalElement) {
      // Se crea una nueva instancia de la clase Modal de Bootstrap
      const modal = new (window as any).bootstrap.Modal(modalElement);
      // Se muestra el modal
      modal.show();
    }
  }

  confirmDelete() {
    // Si hay un producto seleccionado
    if (this.selectedProducto) {
      // Se llama al servicio para borrar el producto
      this.productoServicio
        .eliminarProducto(this.selectedProducto.id_producto)
        .subscribe(() => {
          // Se vuelve a cargar la lista de productos
          this.obtenerProductos();
          // Se quita la selección del producto
          this.selectedProducto = null;
        });
    }
  }

  cancelDelete() {
    // Se quita la selección del producto
    this.selectedProducto = null;
  }

  // metodo para actualizar un producto
  editarProducto(id: number) {
    // Se redirige a la ruta para editar un producto
    this.router.navigate(['/editar-producto', id]);
  }
}
