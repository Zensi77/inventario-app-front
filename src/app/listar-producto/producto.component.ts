import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../Models';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

// Imports de Angular Material para la tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule],
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit, AfterViewInit {
  productos: Producto[]=[];
  productosFiltrados: Producto[];
  selectedProducto: Producto | null = null;

  private modal: any;

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  ngAfterViewInit(): void {
      setTimeout(() => { // Se espera un tiempo para que se cargue la tabla
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
  }

  // metodo para obtener productos
  // subscribe: se suscribe a los cambios de la petición
  // Expresion lambda (productos => this.productos = productos): asigna el resultado de la petición
  obtenerProductos() {
    this.productoServicio
      .obtenerProductos()
      .subscribe((productos) => {
        this.dataSource.data = productos; // Se asignan los productos a la tabla
        this.productos = productos;
      });
  }

  openConfirmModal(producto: Producto) {
    // Se asigna el producto seleccionado
    this.selectedProducto = producto;
    // Se obtiene el elemento modal
    const modalElement = document.getElementById('confirmDeleteModal');
    // Si existe el elemento modal
    if (modalElement) {
      // Se crea una nueva instancia de la clase Modal de Bootstrap
      this.modal = new (window as any).bootstrap.Modal(modalElement);
      // Se muestra el modal
      this.modal.show();
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

    // Cierra la ventana modal
    this.modal.hide();
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

  // metodo para filtrar productos
  applyFilter(event: Event) {
    // Se obtiene el valor del input
    const filterValue = (event.target as HTMLInputElement).value;
    // Se filtran los productos
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
